import { Component, Input } from '@angular/core';
import { Movie } from '../../models/movie';
import { MoviesService } from '../../services/movies.service';
import { responsiveOptions } from '../../contsants/responsiveOptions';

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.scss'],
})
export class BannerComponent {
  responsiveOptions;

  @Input() title = 'Movies';
  @Input() movies: Movie[] = [];
  @Input() type = 'movie';

  constructor(private moviesService: MoviesService) {
    this.responsiveOptions = responsiveOptions;
  }
}
