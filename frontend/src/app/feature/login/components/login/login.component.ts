import { Component, OnDestroy } from '@angular/core';
import { FormBuilder, Validators } from "@angular/forms";
import { Subject, takeUntil } from "rxjs";
import { AuthService } from "@core/service/auth.service";
import { Router } from "@angular/router";
import { ControlConfigModel } from "@core/models/control-config";
import { Credentials } from "@core/models/credentials";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnDestroy {

  public loginForm = this.formBuilder.group<ControlConfigModel<Credentials>>({
    username: [null, [Validators.required, Validators.email]],
    password: [null, Validators.required],
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

  public login(): void {
    if (this.loginForm.valid) {
      this.authService.login(this.loginForm.getRawValue())
        .pipe(takeUntil(this.destroy$))
        .subscribe({
          next: (response) => {
            this.authService.saveToken(response.data);
            this.router.navigateByUrl('/movies').then();
          },
          error: (err) =>
            this.snackBar.open(err.error.message, '', { duration: 3000 })
        })
    }
  }

}
