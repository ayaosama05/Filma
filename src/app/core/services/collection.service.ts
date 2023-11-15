import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CollectionResponse } from '../models/collection';

@Injectable({
  providedIn: 'root',
})
export class CollectionService {
  private apiURL = 'https://api.themoviedb.org/3';
  private apiKey = '5f6622b5028fd2b9ef57c4dabd71c552';
  private defaultpage = 1;
  constructor(private http: HttpClient) {}

  searchCollectionByType(
    query: string,
    page = this.defaultpage
  ) {
    return this.http
      .get<CollectionResponse>(
        `${this.apiURL}/search/multi?query=${query}&api_key=${this.apiKey}&page=${page}`
      )
     // .pipe(map((data) => data.results.slice(0, count)));
  }
}
