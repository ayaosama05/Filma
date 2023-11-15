import { Component, Input, OnInit } from '@angular/core';
import { MoviesService } from '../../services/movies.service';
import { genre } from '../../models/genre';
import { Observable } from 'rxjs';
import { Movie, MovieResponse } from '../../models/movie';
import { PaginatorState } from 'primeng/paginator';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-genre',
  templateUrl: './genre.component.html',
  styleUrls: ['./genre.component.scss'],
})
export class GenreComponent implements OnInit {
  genres$!: Observable<genre[]>;
  movies$!: Observable<MovieResponse>;
  page = 1;
  rows = 20;
  first = 0;
  maxPage = 499;
  genreID!: number;
  @Input() paginationFirstValue = 0;
  constructor(
    private movieService: MoviesService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.genreID = params['genreId'];
      this.movies$ = this.movieService.getMoviesBygenreID(
        this.genreID,
        this.page
      );
    });
    this.genres$ = this.movieService.getMovieGenres();
    //  this.genreID = this.route.snapshot.params['genreId'];
  }

  getMoviesByGenreID(id: number, page = 1) {
    this.genreID = id;
    this.movies$ = this.movieService.getMoviesBygenreID(id, page);
  }

  onPageChange(event: PaginatorState) {
    this.first = event.first ?? this.first;
    this.rows = event.rows ?? this.rows;
    this.page = event.page ?? this.page;
    if (this.page > this.maxPage) {
      this.page = this.maxPage;
      event.page = this.maxPage;
    }
    this.paginationFirstValue = event.first ?? this.first;
    this.getMoviesByGenreID(this.genreID, this.page + 1);
  }
}
