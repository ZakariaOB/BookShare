import {
  OnInit,
  OnDestroy,
  Input,
  ViewChild,
  ComponentFactoryResolver,
  Component,
} from '@angular/core';
import { SandboxHostDirective } from 'src/app/_directives/sandbox-host.directive';
import { DirectiveSamplesComponent } from '../../directives/directive-samples/directive-samples.component';
import { ComponentHolder } from '../component-holder';
import { DynamicComponentEnum } from '../dynamic-component-enum';
import { TableViewComponent } from '../table-view/table-view.component';
import { SandBoxItem } from './sandbox-item';

@Component({
  selector: 'sandbox-host',
  templateUrl: './sandbox-host.component.html',
  styleUrls: ['./sandbox-host.component.scss'],
})
export class SandBoxHostComponent implements OnInit {
  @Input() items: SandBoxItem[];
  @ViewChild(SandboxHostDirective, { static: true }) sandboxHost: SandboxHostDirective;
  
  get componentList(): ComponentHolder[] {
    return this.items?.map(item => new ComponentHolder(item.component.name, item.componentName))
  }

  constructor(private componentFactoryResolver: ComponentFactoryResolver) {}

  ngOnInit() {
    this.loadCompnentByName(DirectiveSamplesComponent.name);
  }

  loadCompnentByName(name: string): void {
    var dynamiComponent = this.items.find((a) => a.component.name == name);
    if (dynamiComponent) {
      const componentFactory = this.componentFactoryResolver.resolveComponentFactory(
        dynamiComponent.component
      );

      const viewContainerRef = this.sandboxHost.viewContainerRef;
      viewContainerRef.clear();

      const componentRef = viewContainerRef.createComponent(
        componentFactory
      );
      componentRef.instance.data = dynamiComponent.data;
    }
  }
}
