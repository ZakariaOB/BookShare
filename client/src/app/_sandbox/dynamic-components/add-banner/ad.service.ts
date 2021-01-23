import { Injectable } from '@angular/core';

import { HeroJobAdComponent } from './hero-job/hero-job-ad.component';
import { HeroProfileAdComponent } from './hero-profile/hero-profile-ad.component';
import { AdItem } from './ad-item';
import { SimoTestComponent } from './simo-test/simo-test.component';
import { DynamicComponentEnum } from '../dynamic-component-enum';

export class AdService {
  getAds() {
    return [
      new AdItem(DynamicComponentEnum.HeroProfileOne, HeroProfileAdComponent, {
        name: 'Bombasto',
        bio: 'Brave as they come',
      }),

      new AdItem(DynamicComponentEnum.HeroJob, HeroJobAdComponent, {
        headline: 'Hiring for several positions',
        body: 'Submit your resume today!',
      }),

      new AdItem(DynamicComponentEnum.SimoTest, SimoTestComponent, {
        master: 'Computer s...',
      }),
    ];
  }
}
