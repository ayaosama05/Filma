import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './core/pages/home/home.component';
import { ShowDetailComponent } from './core/pages/show-detail/show-detail.component';
import { CollectionListComponent } from './core/pages/collection-list/collection-list.component';
import { FavoriteListComponent } from './core/pages/favorite-list/favorite-list.component';
import { GenreComponent } from './core/pages/genre/genre.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'collection/:type', component: CollectionListComponent },
  { path: 'favorites', component: FavoriteListComponent },
  { path: 'genres', component: GenreComponent },
  { path: 'genres/:genreId', component: GenreComponent },
  {
    path: 'details/:type/:id',
    component: ShowDetailComponent,
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
