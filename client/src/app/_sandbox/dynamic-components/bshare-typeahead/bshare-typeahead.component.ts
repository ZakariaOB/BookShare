import { Component, OnInit, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { noop, Observable, Observer, of } from 'rxjs';
import { map, switchMap, tap, debounceTime, distinctUntilChanged,} from 'rxjs/operators';
import { CountryService } from '../../../_services/country.service';
import { Country } from '../../_interfaces/country';
import { FormControl,FormGroup } from '@angular/forms';
import { LogMessageService } from 'src/app/_services/log-message.service';


@Component({
  selector: 'app-type-ahead',
  templateUrl: './bshare-typeahead.component.html',
  styleUrls: ['./bshare-typeahead.component.scss']
})
export class BShareTypeaheadComponent implements OnInit {
  @Input() formGroup: FormGroup;

  /*stateCtrl = new FormControl('');
  myForm = new FormGroup({
    search: this.stateCtrl
  });*/

  suggestions$: any;
  errorMessage: string;
  selectedMatches= [];
  constructor(private http: HttpClient ,private countryService: CountryService,private messageService: LogMessageService) {}

  ngOnInit(): void {
    this.suggestions$ = new Observable((observer: Observer<string>) => {
      observer.next(this.formGroup.get('country').value);
    }).pipe(
      // wait 300ms after each keystroke before considering the term
      debounceTime(300),
      // ignore new term if same as previous term
      distinctUntilChanged(),
      switchMap((query: string) => {
        if (query) {
          // using github public api to get users by name
          return this.countryService.searchCountries(query).pipe(
            map((data: Country[]) => data || []),
            tap(() => noop, err => {
              // in case of http error
              this.errorMessage = err && err.message || 'Something goes wrong';
            })
          );
        }
        return of([]);
      })
    );
  }

  onSelect(e: any): void {
    console.log('Selected value: ', e.item);
   // console.log('Selected name : ', this.stateCtrl.value);
  }

}

