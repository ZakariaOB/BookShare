import { Component, Input, OnInit } from '@angular/core';
import { AdComponent } from '../ad';

@Component({
  selector: 'app-hero-job',
  templateUrl: './hero-job-ad.component.html',
  styleUrls: ['./hero-job-ad.component.scss']
})
export class HeroJobAdComponent implements OnInit, AdComponent {
  @Input() data: any;
  
  constructor() { }

  ngOnInit(): void {
  }

}
