import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MoviesService } from '../../services/movies.service';
import { Movie } from '../../models/movie';
import { Observable, map } from 'rxjs';
import { imageBaseURL, poster_sizes } from '../../contsants/movie-constant';
import { video } from '../../models/video';
import { poster } from '../../models/poster';
import { Actor } from '../../models/actor';
import { responsiveOptions } from '../../contsants/responsiveOptions';
import { TvshowsService } from '../../services/tvshows.service';
import { mapToMovies, mapTvshowToMovie } from '../../models/tvshow';

@Component({
  selector: 'app-show-detail',
  templateUrl: './show-detail.component.html',
  styleUrls: ['./show-detail.component.scss'],
})
export class ShowDetailComponent implements OnInit {
  movieId = 0;
  type: 'tvshow' | 'movie' = 'movie';

  visible = false;
  poster_sizes = poster_sizes;
  movie$: Observable<Movie> | null = null;
  videos$: Observable<video[]> | null = null;
  trailer$: Observable<video | undefined> | null = null;
  posters$: Observable<poster[]> | null = null;
  actors$: Observable<Actor[]> | null = null;
  simliarMovies$: Observable<Movie[]> | null = null;
  title = '';
  imageBaseURL = imageBaseURL;
  responsiveOptions;

  constructor(
    private router: ActivatedRoute,
    private movieService: MoviesService,
    private tvshowService: TvshowsService
  ) {
    this.responsiveOptions = responsiveOptions;
  }

  ngOnInit(): void {
    // this.router.params.subscribe((result) => {
    //   this.movieId = result['id'];
    // });
    /*     this.route.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.paramMap.subscribe((result) => {
      this.movieId = Number(result.get('id'));
      this.type = result.get('type');
    }); */
    this.router.params.subscribe((params) => {
      this.movieId = params['id'];
      this.type = params['type'];

      if (this.type === 'tvshow') this.loadTvShowData();
      else this.loadMovieData();
    });
    //  this.movieId = this.router.snapshot.params['id'];
    //  this.type = this.router.snapshot.params['type'];
  }

  loadMovieData() {
    this.movie$ = this.movieService.getMovieByID(this.movieId.toString());

    this.videos$ = this.movieService.getMovieVideosByID(
      this.movieId.toString()
    );

    this.trailer$ = this.videos$.pipe(
      map((videos: video[]) => videos.find((video) => video.type == 'Trailer'))
    );

    this.posters$ = this.movieService.getMoviePhotosByID(
      this.movieId.toString()
    );

    this.actors$ = this.movieService.getMovieCastByID(this.movieId.toString());

    this.simliarMovies$ = this.movieService.getSimliarMovies(
      this.movieId.toString()
    );
    this.title = 'Simliar Movies';
  }

  loadTvShowData() {
    this.movie$ = this.tvshowService
      .getTvshowByID(this.movieId.toString())
      .pipe(map(mapTvshowToMovie));

    this.videos$ = this.tvshowService.getTvshowVideosByID(
      this.movieId.toString()
    );

    this.trailer$ = this.videos$.pipe(
      map((videos: video[]) => videos.find((video) => video.type == 'Trailer'))
    );

    this.posters$ = this.tvshowService.getTvshowPhotosByID(
      this.movieId.toString()
    );

    this.actors$ = this.tvshowService.getTvshowCastByID(
      this.movieId.toString()
    );

    this.simliarMovies$ = this.tvshowService
      .getSimliarTvshows(this.movieId.toString())
      .pipe(map(mapToMovies));
    this.title = 'Simliar Tvshows';
  }

  showDialog() {
    this.visible = true;
  }
}
