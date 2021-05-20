import { Component, OnInit } from '@angular/core';
import { GetAllMoviesService, AddFavoriteMovieService, RemoveFavoriteMovieService } from '../fetch-api-data.service';

import { DirectorDialogComponent } from '../director-dialog/director-dialog.component';
import { GenreDialogComponent } from '../genre-dialog/genre-dialog.component';
import { DetailsDialogComponent } from '../details-dialog/details-dialog.component';

import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss']
})
export class MovieCardComponent implements OnInit {
  movies: any[] = [];

  constructor(
    public fetchApiData: GetAllMoviesService,
    public fetchApiData2: AddFavoriteMovieService,
    public fetchApiData3: RemoveFavoriteMovieService,
    public dialog: MatDialog,
    public snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.getMovies();
  }

  getMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((resp: any) => {
      this.movies = resp;
      console.log(this.movies);
      return this.movies;
    });
  }

  showDirectorDialog(name: string, bio: string, birth: Date): void {
    this.dialog.open(DirectorDialogComponent, {
      data: { name, bio, birth },
      width: '500px',
    });
  }

  showGenreDialog(name: string, description: string): void {
    this.dialog.open(GenreDialogComponent, {
      data: { name, description },
      width: '500px',
    });
  }

  showDetailsDialog(title: string, imagepath: string, description: string, director: string, genre: string): void {
    this.dialog.open(DetailsDialogComponent, {
      data: { title, imagepath, description, director, genre },
      width: '500px',
    });
  }

  addFavorite(id: string, title: string): void {
    this.fetchApiData2.addFavoriteMovie(id).subscribe(() => {
      this.snackBar.open(`${title} has been added to your favorites!`, 'OK', {
        duration: 2000,
      });
    });
  }
}
