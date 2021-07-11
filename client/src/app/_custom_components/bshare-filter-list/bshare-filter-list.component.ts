import { Component, Input, OnInit } from '@angular/core';
import { Authors } from 'src/app/_sandbox/_mocks/authors';
import { isNullOrEmpty } from 'src/app/_utils/isNullOrEmpty.ts';
import { isNullOrUndefined } from 'util';

@Component({
  selector: 'app-bshare-filter-list',
  templateUrl: './bshare-filter-list.component.html',
  styleUrls: ['./bshare-filter-list.component.scss'],
})
export class BshareFilterListComponent implements OnInit {
  @Input() items: any[];

  @Input() valueProperty: string;

  @Input() placeholder: string = 'Search ..';

  isShowLess: boolean = false;

  isShowMore: boolean = false;

  filteredItems: any[] = [];

  get isAboveLimit(): boolean {
    return this.filteredItems?.length > 6;
  }

  get noResult(): boolean {
    return isNullOrEmpty(this.filteredItems);
  }

  get showSearchInput(): boolean {
    return this.items?.length > 6;
  }

  get itemsToShow(): any[] {
    if (isNullOrEmpty(this.filteredItems)) {
      return [];
    }
    if (!this.isAboveLimit || this.isShowLess) {
      return this.filteredItems;
    }
    return this.filteredItems.slice(0, 5);
  }

  constructor() {}

  ngOnInit(): void {
    if (this.items == null || this.items.length === 0) {
      this.items = Authors;
    }
    this.valueProperty = 'name';
    this.assignCopyOfItems();
  }

  parseValueProperty(item: any): string {
    if (item === null) {
      return '';
    }
    if (this.valueProperty in item) {
      return item[this.valueProperty];
    }
    return '';
  }

  getId(item: any): string {
    if (item === null) {
      return '';
    }
    return item.id;
  }

  onShowMore(): void {
    this.isShowLess = true;
  }

  onShowLess(): void {
    this.isShowLess = false;
  }

  assignCopyOfItems() {
    this.filteredItems = Object.assign([], this.items);
  }
  
  filterItems(searchValue: any) {
    if (!isNullOrEmpty(searchValue)) {
      this.assignCopyOfItems();
    }
    this.filteredItems = Object.assign([], this.items).filter(
      (item) => item.name.toLowerCase().startsWith(searchValue.toLowerCase())
    );
  }
}
