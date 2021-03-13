import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import {Country} from '../_sandbox/_interfaces/country';
import {City} from '../_sandbox/_interfaces/city';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CountryService {

  // httpOptions = {
  //   headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  // };

  constructor(private http: HttpClient) { }

  /** GET countries from the server */
  getCountries(): Observable<Country[]> {
    return this.http.get<Country[]>(environment.apiUrl + 'country/get-countries');
  }
    /** GET cities from the server */
  searchCities(countryId: number,term: string): any {
    if(!countryId || !term.trim()){
      return of([]);
    }
    return this.http.get<City[]>(environment.apiUrl + 'city/get-cities-by-country' + `/${countryId}/${term}`);
  }

  /* GET countries whose name contains search term */
  searchCountries(term: string): Observable<Country[]> {
    if (!term.trim()) {
      // if not search term, return empty array.
      return of([]);
    }
    return this.http.get<Country[]>(environment.apiUrl + 'country/get-countries' + `/${term}`);
  }
}
