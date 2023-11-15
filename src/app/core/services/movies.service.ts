import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { genreResponse } from '../models/genre';
import { Movie, MovieResponse } from '../models/movie';
import { videoResponse } from '../models/video';
import { map } from 'rxjs';
import { posterReposne } from '../models/poster';
import { ActorResponse } from '../models/actor';

@Injectable({
  providedIn: 'root',
})
export class MoviesService {
  private apiURL = 'https://api.themoviedb.org/3';
  private apiKey = '5f6622b5028fd2b9ef57c4dabd71c552';
  private defaultCount = 20;
  private defaultpage = 1;

  constructor(private http: HttpClient) {}

  getPopularMovies(count = this.defaultCount) {
    return this.getMoviesByType('popular', count);
  }

  getUpcomingMovies(count = this.defaultCount) {
    return this.getMoviesByType('upcoming', count);
  }

  getTopRatedMovies(count = this.defaultCount) {
    return this.getMoviesByType('top_rated', count);
  }

  getMoviesByType(type: string, count = this.defaultCount) {
    return this.http
      .get<MovieResponse>(`${this.apiURL}/movie/${type}?api_key=${this.apiKey}`)
      .pipe(map((data) => data.results.slice(0, count)));
  }

  getMovieGenres() {
    return this.http
      .get<genreResponse>(
        `${this.apiURL}/genre/movie/list?api_key=${this.apiKey}`
      )
      .pipe(map((data) => data.genres));
  }
  getMovieByID(movie_id: string) {
    return this.http.get<Movie>(
      `${this.apiURL}/movie/${movie_id}?api_key=${this.apiKey}`
    );
  }
  getMovieVideosByID(movie_id: string) {
    return this.http
      .get<videoResponse>(
        `${this.apiURL}/movie/${movie_id}/videos?api_key=${this.apiKey}`
      )
      .pipe(map((data) => data.results));
  }
  getMoviePhotosByID(movie_id: string) {
    return this.http
      .get<posterReposne>(
        `${this.apiURL}/movie/${movie_id}/images?api_key=${this.apiKey}`
      )
      .pipe(map((data) => data.posters));
  }
  getMovieCastByID(movie_id: string) {
    return this.http
      .get<ActorResponse>(
        `${this.apiURL}/movie/${movie_id}/credits?api_key=${this.apiKey}`
      )
      .pipe(map((data) => data.cast));
  }
  getSimliarMovies(movie_id: string) {
    return this.http
      .get<MovieResponse>(
        `${this.apiURL}/movie/${movie_id}/similar?api_key=${this.apiKey}`
      )
      .pipe(map((data) => data.results));
  }
  getMoviesList(page = this.defaultpage) {
    return this.http.get<MovieResponse>(
      `${this.apiURL}/discover/movie?page=${page}&api_key=${this.apiKey}`
    );
  }
  getMoviesBygenreID(genreId: number, page = this.defaultpage) {
    return this.http.get<MovieResponse>(
      `${this.apiURL}/discover/movie?include_adult=false
      &api_key=${this.apiKey}&page=${page}&sort_by=popularity.desc&with_genres=${genreId}`
    );
  }
}
