import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent {
  searchValue = '';
  constructor(private router: Router) {}

  searchMovie() {
    this.router.navigate(['/collection/collection'], {
      queryParams: { search: `${this.searchValue}` },
    });
  }
}
