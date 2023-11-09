import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Photo, Post, User } from '../model';
import { Observable, Subject, map, startWith, switchMap } from 'rxjs';

type PostResponse = { type: 'posts'; payload: Post[] };
type PhotoResponse = { type: 'photos'; payload: Photo[] };
type UserResponse = { type: 'users'; payload: User[] };

type ResponseType = PostResponse | PhotoResponse | UserResponse;

@Injectable({
  providedIn: 'root',
})
export class DataService {
  #http = inject(HttpClient);
  #dataTypes = ['posts', 'users', 'photos'];
  #fetchTrigger = new Subject<void>();

  data$ = this.#fetchTrigger.asObservable().pipe(
    startWith(null),
    switchMap(() => this.fetchData())
  );

  fetchData(): Observable<ResponseType> {
    // pick randomly a type of returned data
    const randomType =
      this.#dataTypes[Math.floor(Math.random() * this.#dataTypes.length)];
    return this.#http
      .get(`https://jsonplaceholder.typicode.com/${randomType}?_limit=10`)
      .pipe(map((payload) => ({ payload, type: randomType } as ResponseType)));
  }

  fetch() {
    this.#fetchTrigger.next();
  }
}
