import { Component } from '@angular/core';
import { MoviesService } from '../../services/movies.service';
import { TvshowsService } from '../../services/tvshows.service';
import { map } from 'rxjs';
import { mapToMovies } from '../../models/tvshow';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  constructor(
    private moviesService: MoviesService,
    private tvshowsService: TvshowsService
  ) {}

  popularMovies$ = this.moviesService.getPopularMovies();
  upcomingMovies$ = this.moviesService.getUpcomingMovies();
  topratedMovies$ = this.moviesService.getTopRatedMovies();
  popularTvshows$ = this.tvshowsService
    .getTvshowsByType('popular')
    .pipe(map(mapToMovies));
}
