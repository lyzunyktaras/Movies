import {Router, CanActivateFn} from '@angular/router';
import {inject} from "@angular/core";
import {AuthService} from "@core/service/auth.service";
import {tap} from "rxjs";

export const authGuard: CanActivateFn = () => {
  const router = inject(Router);
  const authService = inject(AuthService);

  return authService.loggedIn.pipe(
    tap((value) => {
      !value && router.navigate(['/login'])
    })
  )
};
