import { Component, Input, OnInit } from '@angular/core';
import { Movie } from '../../models/movie';
import { imageBaseURL } from '../../contsants/movie-constant';
import { FavoriteService } from '../../services/favorite.service';

@Component({
  selector: 'app-show-card',
  templateUrl: './show-card.component.html',
  styleUrls: ['./show-card.component.scss'],
})
export class ShowCardComponent {
  imagesBaseURL = imageBaseURL;
  @Input() movieItem: Movie | null = null;
  @Input() type = 'movie';
  @Input() isFavorite = false;

  constructor(private favoriteService: FavoriteService) {}

  AddToFavoriteList() {
    if (this.movieItem) {
      console.log(this.movieItem);
      console.log(this.type);
      this.isFavorite = true;
      this.favoriteService.AddToFavorites(this.movieItem, this.type);
    }
  }

  getCurrentList() {
    this.favoriteService.getFavoritesList();
  }

  removeFromFavoriteList() {
    if (this.movieItem) {
      this.isFavorite = false;
      this.favoriteService.removeFromFavoriteList(this.movieItem, this.type);
    }
  }
}
