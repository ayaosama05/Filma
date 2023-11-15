import { Component, Input, OnInit } from '@angular/core';
import { MoviesService } from '../../services/movies.service';
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { imageBaseURL } from '../../contsants/movie-constant';
import { genre } from '../../models/genre';
import { Movie } from '../../models/movie';

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.scss'],
  animations: [
    trigger('slideFade', [
      state('void', style({ opacity: 0 })),
      transition('void <=> *', [animate('1s')]),
    ]),
  ],
})
export class SliderComponent implements OnInit {
  slideIndex = 0;
  imagesBaseURL = imageBaseURL;
  genres: genre[] = [];
  @Input() movies: Movie[] = [];

  constructor(private moviesService: MoviesService) {}
  ngOnInit(): void {
    if (this.movies.length > 1) {
      this.changeSlide();
    }
    this.moviesService.getMovieGenres().subscribe((res) => {
      this.genres = res;
    });
  }
  // movies$ = this.moviesService.getPopularMovies();

  changeSlide() {
    setInterval(() => {
      if (this.slideIndex > 10) this.slideIndex = 0;

      this.slideIndex += 1;
    }, 5000);
  }

  getGenres(genreIds?: number[], genres?: genre[]) {
    const arr: (string | undefined)[] = [];
    if (genreIds) {
      genreIds.forEach((genre: number) => {
        arr.push(` ${this.genres.find((a) => a.id === genre)?.name}`);
      });
    } else if (genres) {
      genres.forEach((genre: genre) => {
        arr.push(` ${genre.name}`);
      });
    }
    return arr;
  }
}
