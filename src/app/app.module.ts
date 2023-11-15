import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import { HomeComponent } from './core/pages/home/home.component';
import { SliderComponent } from './core/components/slider/slider.component';
import { HttpClientModule } from '@angular/common/http';
import { CarouselModule } from 'primeng/carousel';
import { SubscribeComponent } from './shared/components/subscribe/subscribe.component';
import { BannerComponent } from './core/components/banner/banner.component';
import { TabViewModule } from 'primeng/tabview';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { ImageModule } from 'primeng/image';
import { PaginatorModule } from 'primeng/paginator';
import { DataViewModule } from 'primeng/dataview';

import { GenreJoinPipe } from './shared/pipes/genre.pipe';
import { ShowVideoComponent } from './core/components/show-video/show-video.component';
import { ShowDetailComponent } from './core/pages/show-detail/show-detail.component';
import { ShowCardComponent } from './core/components/show-card/show-card.component';
import { CollectionListComponent } from './core/pages/collection-list/collection-list.component';
import { FavoriteListComponent } from './core/pages/favorite-list/favorite-list.component';
import { GenreComponent } from './core/pages/genre/genre.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    SliderComponent,
    ShowCardComponent,
    SubscribeComponent,
    BannerComponent,
    GenreJoinPipe,
    ShowVideoComponent,
    ShowDetailComponent,
    CollectionListComponent,
    FavoriteListComponent,
    GenreComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    HttpClientModule,
    BrowserAnimationsModule,
    CarouselModule,
    TabViewModule,
    DialogModule,
    ButtonModule,
    ImageModule,
    PaginatorModule,
    DataViewModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
