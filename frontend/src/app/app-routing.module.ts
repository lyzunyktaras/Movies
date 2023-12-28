import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {authGuard} from "@core/guard/auth.guard";

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'login' },
  {
    path: 'login',
    loadChildren: () => import('./feature/login/login.module').then((m) => m.LoginModule),
  },
  {
    path: 'movies',
    loadChildren: () => import('./feature/movies/movies.module').then((m) => m.MoviesModule),
  },
  { path: '**', redirectTo: 'login' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
