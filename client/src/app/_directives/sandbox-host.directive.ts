import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[sandboxHost]',
})
export class SandboxHostDirective {
  constructor(public viewContainerRef: ViewContainerRef) { }
}