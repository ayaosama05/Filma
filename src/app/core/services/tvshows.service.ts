import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs';
import { Tvshow, TvshowResponse } from '../models/tvshow';
import { genreResponse } from '../models/genre';
import { posterReposne } from '../models/poster';
import { ActorResponse } from '../models/actor';
import { videoResponse } from '../models/video';

@Injectable({
  providedIn: 'root',
})
export class TvshowsService {
  private apiURL = 'https://api.themoviedb.org/3';
  private apiKey = '5f6622b5028fd2b9ef57c4dabd71c552';
  private defaultCount = 20;
  private defaultpage = 1;

  constructor(private http: HttpClient) {}

  getTvshowsByType(type: string, count = this.defaultCount) {
    return this.http
      .get<TvshowResponse>(`${this.apiURL}/tv/${type}?api_key=${this.apiKey}`)
      .pipe(map((data) => data.results.slice(0, count)));
  }
  getTVSeriesByID(show_id: string) {
    return this.http.get<Tvshow>(
      `${this.apiURL}/tv/${show_id}?api_key=${this.apiKey}`
    );
  }

  getTvshowByType(type: string, count = this.defaultCount) {
    return this.http
      .get<TvshowResponse>(`${this.apiURL}/tv/${type}?api_key=${this.apiKey}`)
      .pipe(map((data) => data.results.slice(0, count)));
  }

  getTvshowGenres() {
    return this.http.get<genreResponse>(
      `${this.apiURL}/genre/tv/list?api_key=${this.apiKey}`
    );
  }
  getTvshowByID(movie_id: string) {
    return this.http.get<Tvshow>(
      `${this.apiURL}/tv/${movie_id}?api_key=${this.apiKey}`
    );
  }
  getTvshowVideosByID(series_id: string) {
    return this.http
      .get<videoResponse>(
        `${this.apiURL}/tv/${series_id}/videos?api_key=${this.apiKey}`
      )
      .pipe(map((data) => data.results));
  }
  getTvshowPhotosByID(series_id: string) {
    return this.http
      .get<posterReposne>(
        `${this.apiURL}/tv/${series_id}/images?api_key=${this.apiKey}`
      )
      .pipe(map((data) => data.posters));
  }
  getTvshowCastByID(series_id: string) {
    return this.http
      .get<ActorResponse>(
        `${this.apiURL}/tv/${series_id}/credits?api_key=${this.apiKey}`
      )
      .pipe(map((data) => data.cast));
  }
  getSimliarTvshows(series_id: string) {
    return this.http
      .get<TvshowResponse>(
        `${this.apiURL}/tv/${series_id}/similar?api_key=${this.apiKey}`
      )
      .pipe(map((data) => data.results));
  }

  getTvshowsList(page = this.defaultpage) {
    // https://api.themoviedb.org/3/discover/tv?include_adult=false&include_null_first_air_dates=false&language=en-US&page=1&sort_by=popularity.desc
    return this.http.get<TvshowResponse>(
      `${this.apiURL}/discover/tv?page=${page}&sort_by=popularity.desc&api_key=${this.apiKey}`
    );
  }
}
