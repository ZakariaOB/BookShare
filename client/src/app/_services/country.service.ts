import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import {Country} from '../_sandbox/_interfaces/country';

@Injectable({
  providedIn: 'root'
})
export class CountryService {

  private countriesUrl = 'https://localhost:5001/api/country/get-countries';  // URL to web api

  // httpOptions = {
  //   headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  // };

  constructor(private http: HttpClient) { }

  /** GET countries from the server */
  getCountries(): Observable<Country[]> {
    return this.http.get<Country[]>(this.countriesUrl);
  }

  /* GET countries whose name contains search term */
  searchCountries(term: string): Observable<Country[]> {
    if (!term.trim()) {
      // if not search term, return empty array.
      return of([]);
    }
    return this.http.get<Country[]>(`${this.countriesUrl}/${term}`);
  }
}
