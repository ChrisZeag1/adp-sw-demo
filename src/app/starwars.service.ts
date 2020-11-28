import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import { of, Observable } from 'rxjs';
import { IPeopleApiResponse } from './people.model';

@Injectable()
export class StarWarsService {

  constructor(private http: HttpClient) { }

  getPeople(search?: string): Observable<IPeopleApiResponse> {
    
    return this.http.get<any>(`https://swapi.dev/api/people?search=${ search }`).pipe(
      catchError(e => { 
        console.log('error at getPeople > ', e);
        return of({ results: [], hasError: true });
      })
      );
  }

}