import {
  OnInit,
  OnDestroy,
  Input,
  ViewChild,
  ComponentFactoryResolver,
  Component,
} from '@angular/core';
import { TreeModel } from 'src/app/treeview/tree.model';
import { BshareFilterListComponent } from 'src/app/_custom_components/bshare-filter-list/bshare-filter-list.component';
import { SandboxHostDirective } from 'src/app/_directives/sandbox-host.directive';
import { DirectiveSamplesComponent } from '../../directives/directive-samples/directive-samples.component';
import { ComponentHolder } from '../component-holder';
import { SandBoxItem } from './sandbox-item';

@Component({
  selector: 'sandbox-host',
  templateUrl: './sandbox-host.component.html',
  styleUrls: ['./sandbox-host.component.scss'],
})
export class SandBoxHostComponent implements OnInit {
  @Input() items: SandBoxItem[];
  @ViewChild(SandboxHostDirective, { static: true })
  sandboxHost: SandboxHostDirective;

  treeData: TreeModel;

  get componentList(): ComponentHolder[] {
    return this.items?.map(
      (item) => new ComponentHolder(item.component.name, item.componentName)
    );
  }

  constructor(private componentFactoryResolver: ComponentFactoryResolver) {}

  ngOnInit() {
    this.treeData = new TreeModel(
      'code',
      'componentName',
      'children',
      this.items,
      null,
      true,
      '',
      'demoData_FolderStructure',
      'fa-chevron-right',
      'fa-chevron-down',
      'fa-square-o'
    );
    this.loadCompnentByName(BshareFilterListComponent.name);
  }

  loadCompnentByName(name: string): void {
    var dynamiComponent = this.items.find((a) => a.component.name == name);
    if (dynamiComponent) {
      const componentFactory = this.componentFactoryResolver.resolveComponentFactory(
        dynamiComponent.component
      );

      const viewContainerRef = this.sandboxHost.viewContainerRef;
      viewContainerRef.clear();

      const componentRef = viewContainerRef.createComponent(componentFactory);
      componentRef.instance.data = dynamiComponent.data;
    }
  }
}
