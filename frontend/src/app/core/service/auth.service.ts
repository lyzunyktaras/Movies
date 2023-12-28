import {Injectable} from '@angular/core';
import {environment} from "@environments/environment.development";
import {Credentials} from "@core/models/credentials";
import {BehaviorSubject, Observable} from "rxjs";
import {ResponseDTO} from "@core/models/response";
import {HttpClient} from "@angular/common/http";
import {StorageKeys} from "@core/models/storage-key";
import {coerceBooleanProperty} from "@angular/cdk/coercion";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public loggedIn = new BehaviorSubject<boolean>(coerceBooleanProperty(this.getToken()));
  public url = environment.url;

  constructor(private readonly http: HttpClient, private readonly router: Router) { }

  public login(credential: Credentials): Observable<ResponseDTO<string>> {
    return this.http.post<ResponseDTO<string>>(`${this.url}/api/auth/login`, credential);
  }

  public signIn(credential: Credentials): Observable<ResponseDTO<string>> {
    return this.http.post<ResponseDTO<string>>(`${this.url}/api/auth/register`, credential);
  }

  public logOut(): void {
    this.router.navigate(['/login']).then((resolve) => {
      if (resolve) {
        localStorage.removeItem(StorageKeys.JWT_TOKEN);
        this.loggedIn.next(false);
      }
    });
  }

  public saveToken(token: string): void {
    localStorage.setItem(StorageKeys.JWT_TOKEN, token);
  }

  public getToken(): string {
    return localStorage.getItem(StorageKeys.JWT_TOKEN);
  }
}
