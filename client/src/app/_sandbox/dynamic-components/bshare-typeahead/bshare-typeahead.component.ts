import { Component, OnInit, Input, Self, Output,EventEmitter, forwardRef,Optional, ChangeDetectorRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { noop, Observable, Observer, of } from 'rxjs';
import { map, switchMap, tap, debounceTime, distinctUntilChanged,} from 'rxjs/operators';
import { ControlValueAccessor, NgControl } from '@angular/forms';
import { LogMessageService } from 'src/app/_services/log-message.service';
import { isBs3 } from 'ngx-bootstrap/utils';

export type observableHandler = (query:string) =>  Observable<any[]>;

@Component({
  selector: 'app-type-ahead',
  templateUrl: './bshare-typeahead.component.html',
  styleUrls: ['./bshare-typeahead.component.scss'],
})
export class BShareTypeaheadComponent implements ControlValueAccessor {
  public selected;
  public disabled: boolean;
  suggestions$: Observable<any>;
  noResults: boolean;
  isBs3 = isBs3();

  errorMessage: string;
  @Input() searchHandler: observableHandler;
  @Input() label: string;

  onChange: any = () => {}
  onTouched: any = () => {}

  writeValue(val){
    this.selected= val?.name;
    this._changeDetector.markForCheck();
  }
  registerOnChange(fn: any) {
    this.onChange=fn;
  }
  registerOnTouched(fn: any) {
    this.onTouched=fn;
  }
  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
    this._changeDetector.markForCheck();
  }

  constructor(@Optional() @Self() public ngControl: NgControl,private http: HttpClient ,private messageService: LogMessageService , private _changeDetector: ChangeDetectorRef){
    this.ngControl.valueAccessor=this;
    this.suggestions$ = new Observable((observer: Observer<string>) => {
      observer.next(this.selected);
    }).pipe(
      // wait 300ms after each keystroke before considering the term
      debounceTime(300),
      // ignore new term if same as previous term
      distinctUntilChanged(),
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
      this.onChange(event.item);
      this.selected = event.item.name;
  }

  onValueChange(event: any): void {
    this.onChange(null);
  }

  typeaheadOnBlur(event: any): void {
    this.onTouched();
    this.onChange(null);
    this.selected = '';
  }
  typeaheadNoResults(event: boolean): void {
    this.noResults=event;
  }
}
