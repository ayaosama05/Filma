import { Movie, MovieResponse } from './movie';

export type Tvshow = {
  adult: boolean;
  backdrop_path: string;
  first_air_date: string;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_name: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  name: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
};

export type TvshowResponse = {
  page: number;
  results: Tvshow[];
  total_pages: number;
  total_results: number;
};

export function mapTvshowToMovie(tvshow: Tvshow): Movie {
  return {
    ...tvshow,
    title: tvshow.name,
    original_title: tvshow.original_name,
  };
}

export function mapToMovies(tvshows: Tvshow[]): Movie[] {
  return tvshows.map((tvshow: Tvshow) => {
    return {
      ...tvshow,
      title: tvshow.name,
      original_title: tvshow.original_name,
    };
  });
}

export function MapTvshowDtoToMovieDto(
  response: TvshowResponse
): MovieResponse {
  return {
    total_pages: response.total_pages,
    total_results: response.total_results,
    page: response.page,
    results: mapToMovies(response.results),
  };
}
