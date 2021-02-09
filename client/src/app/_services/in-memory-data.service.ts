import { Injectable ,Injector} from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root',
})
export class InMemoryDataService implements InMemoryDbService {
  httpClient: HttpClient;
  constructor(private inject: Injector){}
  createDb() {
    // this.httpClient= this.inject.get(HttpClient);
    // let countries = this.httpClient.get("../../assets/countries.json");
    let countries =    [
    { id: 11, name: 'Dr Nice' },
    { id: 12, name: 'Narco' },
    { id: 13, name: 'Bombasto' },
    { id: 14, name: 'Celeritas' },
    { id: 15, name: 'Magneta' },
    { id: 16, name: 'RubberMan' },
    { id: 17, name: 'Dynama' },
    { id: 18, name: 'Dr IQ' },
    { id: 19, name: 'Magma' },
    { id: 20, name: 'Tornado' }]
    return {countries};
  }

  // Overrides the genId method to ensure that a hero always has an id.
  // If the heroes array is empty,
  // the method below returns the initial number (11).
  // if the heroes array is not empty, the method below returns the highest
  // hero id + 1.
  // genId(heroes): number {
  //    return heroes.length > 0 ? Math.max(...heroes.map(hero => hero.id)) + 1 : 11;
  //  }
}
