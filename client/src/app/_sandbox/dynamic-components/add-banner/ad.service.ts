import { TableViewComponent } from '../table-view/table-view.component';
import { AdItem } from './ad-item';
import { DynamicComponentEnum } from '../dynamic-component-enum';
import { Topics } from '../../_mocks/topics';
import { BShareTypeaheadComponent } from '../bshare-typeahead/bshare-typeahead.component';
import { BshareMultiselectComponent } from '../../multi-select-test/bshare-multiselect/bshare-multiselect.component';
import { MultiSelectSamplesComponent } from '../../multi-select-test/multi-select-samples/multi-select-samples.component';
import {TestFormsComponent} from '../test-forms/test-forms.component';

export class AdService {
  getAds() {
    return [
      new AdItem(DynamicComponentEnum.TableView, TableViewComponent, {
        items: Topics,
      }),
      new AdItem(DynamicComponentEnum.TypeAhead, BShareTypeaheadComponent, {
        list: [
          {id: 1, name: 'maroc'},
          {id: 2, name: 'algerie'},
          {id: 3, name: 'tunisie'},
        ],
      }),
      new AdItem(DynamicComponentEnum.Forms, TestFormsComponent, {
        data: [],
      }),
      new AdItem(DynamicComponentEnum.MultiSelecSamples, MultiSelectSamplesComponent)
    ];
  }
}
