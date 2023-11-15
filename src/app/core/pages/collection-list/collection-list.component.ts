import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { CollectionService } from '../../services/collection.service';
import { Observable, map } from 'rxjs';
import { MapToMovieDto } from '../../models/collection';
import { Movie, MovieResponse } from '../../models/movie';
import { PaginatorState } from 'primeng/paginator';
import { MoviesService } from '../../services/movies.service';
import { TvshowsService } from '../../services/tvshows.service';
import { MapTvshowDtoToMovieDto } from '../../models/tvshow';

@Component({
  selector: 'app-collection-list',
  templateUrl: './collection-list.component.html',
  styleUrls: ['./collection-list.component.scss'],
})
export class CollectionListComponent implements OnInit {
  search: string | null = null;
  collectionList$: Observable<Movie[]> | null = null;
  collectionResponse$: Observable<MovieResponse> | null = null;
  showType: 'movie' | 'tvshow' | 'collection' = 'collection';

  @Input() paginationFirstValue = 0;
  @Input() title: string | null = null;

  page = 1;
  rows = 20;
  first = 0;
  maxPage = 499;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private collectionService: CollectionService,
    private movieService: MoviesService,
    private tvshowService: TvshowsService
  ) {}

  ngOnInit(): void {
    // ... subscription to param
    // this.router.routeReuseStrategy.shouldReuseRoute = () => false;

    this.route.params.subscribe((param: Params) => {
      this.search = param['search'];
      this.showType = param['type'];
      this.getList(this.page, this.search ?? '');
      //    console.log(this.search);
    });
    //  this.showType = this.route.snapshot.params['type'];

    //  console.log('Inside OnInit');
  }

  onPageChange(event: PaginatorState) {
    this.first = event.first ?? this.first;
    this.rows = event.rows ?? this.rows;
    this.page = event.page ?? this.page;
    if (this.page > this.maxPage) {
      this.page = this.maxPage;
      event.page = this.maxPage;
    }
    this.paginationFirstValue = event.first ?? this.first;
    this.getList(this.page + 1, this.search ?? '');
  }

  getList(page?: number, searchItem?: string) {
    //this.collectionList$ = this.collectionService
    //  .searchCollectionByType(this.search ?? '',  page)
    //  .pipe(map(MapToMovies));
    //
    if (this.showType == 'movie') {
      this.collectionResponse$ = this.movieService.getMoviesList(page);
      this.title = 'Movies';
    } else if (this.showType == 'tvshow') {
      this.collectionResponse$ = this.tvshowService
        .getTvshowsList(page)
        .pipe(map(MapTvshowDtoToMovieDto));
      this.title = 'Tv shows';
    } else {
      this.collectionResponse$ = this.collectionService
        .searchCollectionByType(searchItem ?? '', page)
        .pipe(map(MapToMovieDto));
    }
  }
}
