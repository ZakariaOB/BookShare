import { Type } from '@angular/core';

export class SandBoxItem {
  code: string;
  componentName: string;
  component: Type<any>;
  data?: any;
  children: SandBoxItem[];

  constructor(options?: {
    componentName?: string;
    code?: string;
    component?: Type<any>;
    data?: any;
    children?:SandBoxItem[];
  }) {
    options = options || {};
    this.code = options.code;
    this.componentName = options.componentName;
    this.component = options.component;
    this.data = options.data;
    this.children= options.children;
  }
}
