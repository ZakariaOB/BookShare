import { Component, Input, OnInit } from '@angular/core';
import { AdComponent } from '../ad';

@Component({
  selector: 'app-hero-profile',
  templateUrl: './hero-profile-ad.component.html',
  styleUrls: ['./hero-profile-ad.component.scss']
})
export class HeroProfileAdComponent implements OnInit, AdComponent {
  ngOnInit(): void {
  }
  @Input() data: any;
}
