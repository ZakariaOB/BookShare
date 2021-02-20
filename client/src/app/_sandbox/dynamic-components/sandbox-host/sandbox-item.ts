import { Type } from '@angular/core';

export class SandBoxItem {
  componentName: string;
  component: Type<any>;
  data?: any;

  constructor(options?: {
    componentName?: string;
    component?: Type<any>;
    data?: any;
  }) {
    options = options || {};
    this.componentName = options.componentName;
    this.component = options.component;
    this.data = options.data;
  }
}
