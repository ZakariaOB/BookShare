import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { IDropdownSettings } from 'ng-multiselect-dropdown';

@Component({
  selector: 'app-bshare-multiselect',
  templateUrl: './bshare-multiselect.component.html',
  styleUrls: ['./bshare-multiselect.component.scss'],
})
export class BshareMultiselectComponent<T> implements OnInit {
  @Input()
  model: T[];

  @Output()
  modelChange: EventEmitter<T[]> = new EventEmitter<T[]>();

  @Input()
  dropdownOptions: T[] = [];

  @Input()
  dropdownSettings: any = {};
  
  @Input()
  placeHolder: string = '';

  @Input()
  title: string = '';

  selectedItems = [];

  ngOnInit() {
    console.log(this.dropdownOptions);
    console.log(this.title);
  }
  onItemSelect(item: any) {
    console.log(item);
  }

  onItemDeSelect(item: any) {
    console.log(item);
  }

  onSelectAll(items: any) {
    console.log(items);
  }
}
