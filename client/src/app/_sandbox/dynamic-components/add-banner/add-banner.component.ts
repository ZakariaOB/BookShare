import {
  OnInit,
  OnDestroy,
  Input,
  ViewChild,
  ComponentFactoryResolver,
  Component,
} from '@angular/core';
import { AdDirective } from 'src/app/_directives/ad.directive';
import { ComponentHolder } from '../component-holder';
import { DynamicComponentEnum } from '../dynamic-component-enum';
import { AdComponent } from './ad';
import { AdItem } from './ad-item';

@Component({
  selector: 'add-banner',
  templateUrl: './add-banner.component.html',
  styleUrls: ['./add-banner.component.scss'],
})
export class AddBannerComponent implements OnInit {
  @Input() ads: AdItem[];
  @ViewChild(AdDirective, { static: true }) adHost: AdDirective;

  componentList: ComponentHolder[] = [
    new ComponentHolder('Table View', DynamicComponentEnum.TableView),
    new ComponentHolder('Type Ahead', DynamicComponentEnum.TypeAhead),
    new ComponentHolder('Multi select samples', DynamicComponentEnum.MultiSelecSamples),
  ];

  constructor(private componentFactoryResolver: ComponentFactoryResolver) {}

  ngOnInit() {
    this.loadCompnentByEnum(DynamicComponentEnum.TableView);
  }

  loadCompnentByEnum(compoEnum: DynamicComponentEnum): void {
    var dynamiComponent = this.ads.find((a) => a.enumComp == compoEnum);
    if (dynamiComponent) {
      const componentFactory = this.componentFactoryResolver.resolveComponentFactory(
        dynamiComponent.component
      );

      const viewContainerRef = this.adHost.viewContainerRef;
      viewContainerRef.clear();

      const componentRef = viewContainerRef.createComponent<AdComponent>(
        componentFactory
      );
      componentRef.instance.data = dynamiComponent.data;
    }
  }
}
