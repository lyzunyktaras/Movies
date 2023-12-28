import {Component, OnDestroy, OnInit} from '@angular/core';
import {BreakpointObserver} from "@angular/cdk/layout";
import {map, Observable, Subject, takeUntil} from "rxjs";
import {ActivatedRoute, Router} from "@angular/router";
import {ImageCroppedEvent} from "ngx-image-cropper";
import {ControlConfigModel} from "@core/models/control-config";
import {FormBuilder, Validators} from "@angular/forms";
import {MovieDescription} from "@core/models/movie-description";
import {MoviesService} from "@core/service/movies.service";
import {Movies} from "@core/models/movies";
import {ResponseDTO} from "@core/models/response";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-update-movie-list',
  templateUrl: './update-movie-list.component.html',
  styleUrls: ['./update-movie-list.component.scss']
})
export class UpdateMovieListComponent implements OnInit, OnDestroy {
  public isDekstop: boolean;
  public edit = false;
  private currentMovie: any;

  public updateForm = this.formBuilder.group<ControlConfigModel<MovieDescription>>({
    title: ['', Validators.required],
    year: [null, Validators.required],
  });

  private base64: string;
  private destroy$ = new Subject();

  constructor(
    private readonly moviesService: MoviesService,
    private readonly breakpointObserver: BreakpointObserver,
    private readonly activatedRoute: ActivatedRoute,
    private readonly formBuilder: FormBuilder,
    private readonly router: Router,
    private readonly snackBar: MatSnackBar
    ) {}

  public ngOnInit(): void {
    this.observeBreakpoints();

    this.activatedRoute.paramMap
      .pipe(map(() => window.history.state))
      .subscribe((value) => {
        if (value.id) {
          this.currentMovie = value;
          this.base64 = value?.['image'];
          this.updateForm.patchValue(value);
          this.edit = true;
        }
      })
  }

  public ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
  }

  public submitPhoto(event: ImageCroppedEvent): void {
    this.base64 = event.base64;
  }

  public createUpdateMovie(): void {
    if (this.base64 && this.updateForm.valid) {
      const movieData: Movies = {
        image: this.base64,
        title: this.updateForm.get('title').value,
        year: this.updateForm.get('year').value
      };

      const movieObservable$: Observable<any> = this.edit
        ? this.moviesService.updateMovie({ ...movieData, id: this.currentMovie.id })
        : this.moviesService.createMovie(movieData);

      movieObservable$.pipe(takeUntil(this.destroy$)).subscribe(() => {
        this.router.navigate(['/movies']);
      });
    } else {
        this.snackBar.open("You should fill all fields", "", { duration: 3000 })
    }

  }

  public deleteMovie(): void {
    this.moviesService.deleteMovie(this.currentMovie.id)
      .pipe(takeUntil(this.destroy$))
      .subscribe((response) => {
        this.router.navigate(['/movies'])
      })
  }

  private observeBreakpoints(): void {
    this.breakpointObserver.observe(['(max-width: 600px)'])
      .pipe(takeUntil(this.destroy$))
      .subscribe((value) => {
        this.isDekstop = value.matches;
      })
  }
}
