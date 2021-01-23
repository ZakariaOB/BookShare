import { Component, Input, OnInit } from '@angular/core';
import { AdComponent } from '../ad';

@Component({
  selector: 'app-simo-test',
  templateUrl: './simo-test.component.html',
  styleUrls: ['./simo-test.component.scss']
})
export class SimoTestComponent implements OnInit, AdComponent {

  @Input() data: any;

  constructor() { }
  ngOnInit(): void {
  }

}
