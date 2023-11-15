import { Component, OnInit } from '@angular/core';
import { FavoriteService } from 'src/app/core/services/favorite.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  isMenuOpen = false;
  count = 0;
  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
  }
  constructor(private favoriteService: FavoriteService) {}
  ngOnInit(): void {
    this.favoriteService.subject.subscribe((item) => {
      this.count = item.length;
    });
  }
}
