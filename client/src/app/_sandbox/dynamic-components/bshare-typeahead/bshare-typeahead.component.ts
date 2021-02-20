import { Component, OnInit, Input, Self, Output,EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { noop, Observable, Observer, of } from 'rxjs';
import { map, switchMap, tap, debounceTime, distinctUntilChanged,} from 'rxjs/operators';
import { CountryService } from '../../../_services/country.service';
import { Country } from '../../_interfaces/country';
import { ControlValueAccessor, NgControl } from '@angular/forms';
import { LogMessageService } from 'src/app/_services/log-message.service';


@Component({
  selector: 'app-type-ahead',
  templateUrl: './bshare-typeahead.component.html',
  styleUrls: ['./bshare-typeahead.component.scss']
})
export class BShareTypeaheadComponent implements OnInit,ControlValueAccessor {
  @Input() label: string;
  @Output() noResultEvent = new EventEmitter<boolean>();
  suggestions$: any;
  errorMessage: string;
  selectedMatches= [];
  optionOnBlur: any;
  noResult = false;

  constructor(@Self() public ngControl: NgControl,private http: HttpClient ,private countryService: CountryService,private messageService: LogMessageService) {
    this.ngControl.valueAccessor = this;
  }

  ngOnInit(): void {
    this.loadList();
  }

  writeValue(obj: any): void {
  }

  registerOnChange(fn: any): void {
  }

  registerOnTouched(fn: any): void {
  }

  loadList(): void {
    this.suggestions$ = new Observable((observer: Observer<string>) => {
      observer.next(this.ngControl.value);
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

  onSelect(event: any): void {
    console.log('Selected value: ', event.item);
   // console.log('Selected name : ', this.stateCtrl.value);
  }

  typeaheadOnBlur(event: any): void {
    this.optionOnBlur = event.item;
    console.log("on blur value:  ", event.item);
  }
  typeaheadNoResults(event: boolean): void {
    this.noResult = event;
    console.log('no result event',event);
    this.noResultEvent.emit(event);
  }
}

