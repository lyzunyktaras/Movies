import { inject } from '@angular/core';
import { HttpErrorResponse, HttpHandlerFn, HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';

export const errorInterceptor: HttpInterceptorFn = (request: HttpRequest<unknown>, next: HttpHandlerFn) => {
  const router = inject(Router);

  return next(request).pipe(
    catchError((err) => {
      if (err instanceof HttpErrorResponse) {
        switch (err.status) {
          case 401:
            router.navigate(['/login']);
            break;
          case 404:
            router.navigate(['404']);
            break;
        }
      }
      throw err;
    })
  );
};
