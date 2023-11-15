import { Component, OnInit } from '@angular/core';
import { FavoriteService } from '../../services/favorite.service';
import { Favorite } from '../../models/favorite';
import { PaginatorState } from 'primeng/paginator';

@Component({
  selector: 'app-favorite-list',
  templateUrl: './favorite-list.component.html',
  styleUrls: ['./favorite-list.component.scss'],
})
export class FavoriteListComponent implements OnInit {
  favoriteList: Favorite[] = [];
  page = 1;
  rows = 20;
  first = 0;
  maxPage = 499;
  paginationFirstValue = 0;

  constructor(private favoriteService: FavoriteService) {}
  ngOnInit(): void {
    this.favoriteList = this.favoriteService.getFavoritesList();
    console.log(this.favoriteList);
  }
}
