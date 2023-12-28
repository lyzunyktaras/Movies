import { Injectable } from '@angular/core';
import {environment} from "@environments/environment.development";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {ResponseDTO} from "@core/models/response";
import {Movies} from "@core/models/movies";

@Injectable({
  providedIn: 'root'
})
export class MoviesService {
  public url = environment.url;

  constructor(private readonly http: HttpClient) { }

  public getMovies(): Observable<ResponseDTO<Movies[]>> {
    return this.http.get<ResponseDTO<Movies[]>>(`${this.url}/api/movie`);
  }

  public createMovie(movie: Movies): Observable<void> {
    return this.http.post<void>(`${this.url}/api/movie`, movie);
  }

  public updateMovie(movie: Movies): Observable<ResponseDTO<Movies[]>> {
    return this.http.put<ResponseDTO<Movies[]>>(`${this.url}/api/movie/${movie.id}`, movie);
  }

  public deleteMovie(id: number): Observable<void> {
    return this.http.delete<void>(`${this.url}/api/movie/${id}`);
  }

}
