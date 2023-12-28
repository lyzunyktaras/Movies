import { HttpHandlerFn, HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import {StorageKeys} from "@core/models/storage-key";

export const authInterceptor: HttpInterceptorFn = (req: HttpRequest<unknown>, next: HttpHandlerFn) => {
  const jwtToken = localStorage.getItem(StorageKeys.JWT_TOKEN);
  const modifiedReq = req.clone({
    headers: req.headers.set('Authorization', `Bearer ${jwtToken}`),
  });
  return next(modifiedReq);
};
