import { TableViewComponent } from '../table-view/table-view.component';
import { DynamicComponentEnum } from '../dynamic-component-enum';
import { Topics } from '../../_mocks/topics';
import { BShareTypeaheadComponent } from '../bshare-typeahead/bshare-typeahead.component';
import { MultiSelectSamplesComponent } from '../../multi-select-test/multi-select-samples/multi-select-samples.component';
import { SandBoxItem } from './sandbox-item';
import { DirectiveSamplesComponent } from '../../directives/directive-samples/directive-samples.component';

export class SandboxService {
  getDynamiComponentsDescriptors() {
    return [
      new SandBoxItem({
        componentName: 'Table View',
        component: TableViewComponent,
        data: { items: Topics },
      }),
      new SandBoxItem({
        componentName: 'Type Ahead',
        component: BShareTypeaheadComponent,
        data: {
          list: [
            { id: 1, name: 'maroc' },
            { id: 2, name: 'algerie' },
            { id: 3, name: 'tunisie' },
          ],
        },
      }),
      new SandBoxItem({
        componentName: 'Multi Select',
        component: MultiSelectSamplesComponent,
      }),
      new SandBoxItem({
        componentName: 'Directive samples',
        component: DirectiveSamplesComponent,
      }),
    ];
  }
}
