import { Component, OnInit } from '@angular/core';

import {Topics} from '../../_mocks/topics';
import {Topic} from '../../_interfaces/topic';

@Component({
  selector: 'app-table-view',
  templateUrl: './table-view.component.html',
  styleUrls: ['./table-view.component.css']
})
export class TableViewComponent implements OnInit {

  topics: Topic[] = Topics;

  constructor() { }

  ngOnInit(): void {
  }

}
