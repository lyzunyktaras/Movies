import {Component, OnDestroy, OnInit} from '@angular/core';
import { Movies } from "../../../../core/models/movies";
import {Subject, takeUntil} from "rxjs";
import {BreakpointObserver} from "@angular/cdk/layout";
import {AuthService} from "@core/service/auth.service";
import {MoviesService} from "@core/service/movies.service";

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.scss']
})

export class MoviesComponent implements OnInit, OnDestroy {

  public movies: Movies[] = []
  public pageSize = 8;
  public visibleItems: any;

  private destroy$ = new Subject();

  constructor(private readonly authService: AuthService, private readonly moviesService: MoviesService) {
  }

  public ngOnInit(): void {
    this.getMovies()
  }

  public ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
  }

  public logout(): void {
    this.authService.logOut();
  }

  public onPageChange(page: number): void {
    const startIndex = (page - 1) * this.pageSize;
    const items = this.movies.slice(
      startIndex,
      startIndex + this.pageSize
    );
    this.visibleItems = { items, total: this.movies.length };
  }

  private getMovies(): void {
    this.moviesService.getMovies()
      .pipe(takeUntil(this.destroy$))
      .subscribe((response) => {
        this.movies = response.data;
        this.visibleItems = {
          items: response.data.slice(0, this.pageSize),
          total: response.data.length
        }
      })
  }

}
