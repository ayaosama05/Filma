import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Movie } from '../models/movie';
import { Favorite } from '../models/favorite';

@Injectable({
  providedIn: 'root',
})
export class FavoriteService {
  subject = new BehaviorSubject<Favorite[]>(this.getFavoritesList());
  favoriteList: Favorite[] = [];

  AddToFavorites(item: Movie, type: string) {
    const favoriteItem: Favorite = {
      item: item,
      type: type,
    };
    this.favoriteList.push(favoriteItem);
    this.SaveList(this.favoriteList);
  }

  SaveList(list: Favorite[]) {
    localStorage.setItem('faovritesMovies', JSON.stringify(list));
    this.subject.next(this.favoriteList);
  }

  getFavoritesList() {
    const list = localStorage.getItem('faovritesMovies');
    if (list) {
      this.favoriteList = JSON.parse(list);
    }
    return this.favoriteList;
  }

  removeFromFavoriteList(item: Movie, type: string) {
    const elm = this.favoriteList.find(
      (a) => a.type === type && a.item === item
    );
    if (elm) {
      this.favoriteList.splice(this.favoriteList.indexOf(elm), 1);
      this.SaveList(this.favoriteList);
    }
  }
}
