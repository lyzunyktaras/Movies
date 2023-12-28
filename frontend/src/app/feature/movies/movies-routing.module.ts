import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {MoviesComponent} from "./components/movies/movies.component";
import {UpdateMovieListComponent} from "./components/movies/update-movie-list/update-movie-list.component";
import {authGuard} from "@core/guard/auth.guard";

const routes: Routes = [
  {
    path: '',
    component: MoviesComponent,
  },
  {
    path: 'update-movie-list',
    component: UpdateMovieListComponent,

  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MoviesRoutingModule { }
