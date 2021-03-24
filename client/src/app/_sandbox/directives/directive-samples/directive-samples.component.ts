import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-directive-samples',
  templateUrl: './directive-samples.component.html',
  styleUrls: ['./directive-samples.component.scss']
})
export class DirectiveSamplesComponent implements OnInit {

  color: string = "blue";

  greenColor: string = "green";


  constructor() { }

  ngOnInit(): void {
  }
}
