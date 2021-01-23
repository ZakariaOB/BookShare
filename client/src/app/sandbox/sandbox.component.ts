import { Component, OnInit } from '@angular/core';
import { AdItem } from '../_sandbox/dynamic-components/add-banner/ad-item';
import { AdService } from '../_sandbox/dynamic-components/add-banner/ad.service';

@Component({
  selector: 'app-sandbox',
  templateUrl: './sandbox.component.html',
  styleUrls: ['./sandbox.component.scss']
})
export class SandboxComponent implements OnInit {

  ads: AdItem[];

  constructor(private adService: AdService) {}

  ngOnInit() {
    this.ads = this.adService.getAds();
  }

}
