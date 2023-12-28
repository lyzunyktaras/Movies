import { Component, OnDestroy } from '@angular/core';
import { ControlConfigModel } from "@core/models/control-config";
import { Credentials } from "@core/models/credentials";
import { FormBuilder, Validators } from "@angular/forms";
import { AuthService } from "@core/service/auth.service";
import { Router } from "@angular/router";
import {Subject, takeUntil} from "rxjs";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnDestroy{

  public signForm = this.formBuilder.group<ControlConfigModel<Credentials>>({
    username: [null, [Validators.required, Validators.email]],
    password: [null, [Validators.required, Validators.minLength(8)]],
  });

  private destroy$ = new Subject();

  constructor(
    private readonly authService: AuthService,
    private readonly formBuilder: FormBuilder,
    private readonly router: Router,
    private readonly snackBar: MatSnackBar
  ) {}

  public ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
  }

  public signUp(): void {
    if (this.signForm.valid) {
      this.authService.signIn(this.signForm.getRawValue()).pipe(takeUntil(this.destroy$)).subscribe({
        next: () => {
          this.router.navigate(['/login']);
          this.snackBar.open("Your account has been successfully created.", "", { duration: 3000 })
        },
        error: (err) => {
          this.snackBar.open(err.error.message, '', { duration: 3000 })
        }
      })
    }
  }
}

