import { Type } from '@angular/core';
import { DynamicComponentEnum } from '../dynamic-component-enum';

export class AdItem {
  constructor(
    public enumComp: DynamicComponentEnum,
    public component: Type<any>,
    public data?: any
  ) {}
}
