import { TableViewComponent } from '../table-view/table-view.component';
import { AdItem } from './ad-item';
import { DynamicComponentEnum } from '../dynamic-component-enum';
import { Topics } from '../../_mocks/topics';
import { TypeAheadComponent } from '../type-ahead/type-ahead.component';

export class AdService {
  getAds() {
    return [
      new AdItem(DynamicComponentEnum.TableView, TableViewComponent, {
        items: Topics,
      }),
      new AdItem(DynamicComponentEnum.TypeAhead, TypeAheadComponent, {
        list: [
          {id: 1, name: 'maroc'},
          {id: 2, name: 'algerie'},
          {id: 3, name: 'tunisie'},
        ],
      }),
    ];
  }
}
