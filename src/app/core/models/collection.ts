import { Movie, MovieResponse } from './movie';

export type Collection = {
  adult: boolean;
  backdrop_path: string;
  id: number;
  name: string;
  original_language: string;
  original_name: string;
  overview: string;
  poster_path: string;
  media_type: string;
  first_air_date: string;
  genre_ids: number[];
  popularity: number;
  vote_average: number;
  vote_count: number;
  origin_country: string[];
};

export type CollectionResponse = {
  page: number;
  results: Collection[];
  total_pages: number;
  total_results: number;
};

export function MapToMovies(collection: Collection[]): Movie[] {
  return collection.map((item: Collection) => {
    return {
      ...item,
      title: item.name,
      original_title: item.original_name,
      release_date: item.first_air_date,
      video: false,
    };
  });
}
   export function MapToMovieDto(response: CollectionResponse): MovieResponse {
      return {
        total_pages: response.total_pages,
        total_results:response.total_results,
        page:response.page,
        results : MapToMovies(response.results)
      };
  }
