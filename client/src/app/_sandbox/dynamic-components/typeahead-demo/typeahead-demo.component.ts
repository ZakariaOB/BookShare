import { Component, OnInit, Input, forwardRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { noop, Observable, Observer, of } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';


export type observableHandler = (query:string) =>  Observable<any[]>;

@Component({
  selector: 'app-typeahead-demo',
  templateUrl: './typeahead-demo.component.html',
  styleUrls: ['./typeahead-demo.component.scss'],
  providers:[{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef( ()=> TypeaheadDemoComponent),
    multi: true
  }]
})
export class TypeaheadDemoComponent implements ControlValueAccessor {
  public selected;
  public disabled: boolean;
  public selectedId: number;
  suggestions$: Observable<any>;

  errorMessage: string;
  @Input() searchHandler: observableHandler;

  onChange: any = () => {}
  onTouched: any = () => {}

  writeValue(val){
    this.selected = val.name;
    this.selectedId = val.id;
  }
  registerOnChange(fn: any) {
    this.onChange=fn;
  }
  registerOnTouched(fn: any) {
    this.onTouched=fn;
  }
  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  constructor(private http: HttpClient) {
    this.suggestions$ = new Observable((observer: Observer<string>) => {
      observer.next(this.selected);
    }).pipe(
      switchMap((query: string) => {
        if (query) {
          return this.searchHandler(query).pipe(
            map((data: any) => data || []),
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
    this.onTouched();
    if(event.item.id != this.selectedId || !this.selectedId ) {
      this.onChange(event.item);
      this.selectedId = event.item.id;
    }
  }
  typeaheadOnBlur(event): void {
    this.onTouched();
    this.onChange(null);
    this.selected = '';
    this.selectedId=null;
  }
}
