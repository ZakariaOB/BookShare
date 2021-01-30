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
  styleUrls: ['./add-banner.component.css'],
})
export class AddBannerComponent implements OnInit, OnDestroy {
  @Input() ads: AdItem[];
  @ViewChild(AdDirective, { static: true }) adHost: AdDirective;

  componentList: ComponentHolder[] = [
    new ComponentHolder('Table View', DynamicComponentEnum.TableView),
    new ComponentHolder('Type Ahead', DynamicComponentEnum.TypeAhead),
  ];

  constructor(private componentFactoryResolver: ComponentFactoryResolver) {}

  ngOnInit() {
    this.loadCompnentByEnum(DynamicComponentEnum.TableView);
  }

  ngOnDestroy() {
    // clearInterval(this.interval);
  }

  /*
  loadComponent() {
    this.currentAdIndex = (this.currentAdIndex + 1) % this.ads.length;
    const adItem = this.ads[this.currentAdIndex];

    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(
      adItem.component
    );

    const viewContainerRef = this.adHost.viewContainerRef;
    viewContainerRef.clear();

    const componentRef = viewContainerRef.createComponent<AdComponent>(
      componentFactory
    );
    componentRef.instance.data = adItem.data;
  }

  getAds() {
    this.interval = setInterval(() => {
      this.loadComponent();
    }, 3000);
  }*/

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
