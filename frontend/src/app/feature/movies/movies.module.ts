import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MoviesRoutingModule } from './movies-routing.module';
import { MoviesComponent } from './components/movies/movies.component';
import { SharedModule } from "../../shared/shared.module";
import { UpdateMovieListComponent } from './components/movies/update-movie-list/update-movie-list.component';
import { NgxDropzoneModule } from "ngx-dropzone";
import { ImageCropperModule } from 'ngx-image-cropper';


@NgModule({
  declarations: [
    MoviesComponent,
    UpdateMovieListComponent
  ],
  imports: [
    CommonModule,
    MoviesRoutingModule,
    SharedModule,
    NgxDropzoneModule,
    ImageCropperModule
  ]
})
export class MoviesModule { }
