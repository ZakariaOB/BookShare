import { TableViewComponent } from '../table-view/table-view.component';
import { Topics } from '../../_mocks/topics';
import { BShareTypeaheadComponent } from '../bshare-typeahead/bshare-typeahead.component';
import { MultiSelectSamplesComponent } from '../../multi-select-test/multi-select-samples/multi-select-samples.component';
import { SandBoxItem } from './sandbox-item';
import { DirectiveSamplesComponent } from '../../directives/directive-samples/directive-samples.component';
import { TestFormsComponent } from '../test-forms/test-forms.component';
import { InputValidationComponent } from '../input-validation/input-validation.component';
import { TreeHostComponent } from 'src/app/treeview/tree-host/tree-host.component';
import { TemplateDemoComponent } from '../template-demo/template-demo.component';

export class SandboxService {
  getDynamiComponentsDescriptors() {
    return [
      new SandBoxItem({
        componentName: 'Angular Template',
        component: TemplateDemoComponent,
        data: { items: Topics },
      }),
      new SandBoxItem({
        componentName: 'Tree View',
        component: TreeHostComponent,

      }),
      new SandBoxItem({
        componentName: 'Type Ahead',
        component: BShareTypeaheadComponent
      }),
      new SandBoxItem({
        componentName: 'Multi Select',
        component: MultiSelectSamplesComponent,
      }),
      new SandBoxItem({
        componentName: 'Input validation',
        component: InputValidationComponent,
      }),
      new SandBoxItem({
        componentName: 'Directive samples',
        component: DirectiveSamplesComponent,
      }),
      new SandBoxItem({
        code:'slkss',
        componentName: 'Mo Test Forms',
        component: TestFormsComponent,
        children: [
          new SandBoxItem({
            code: 'slllss',
          componentName: 'Reactive forms',
          component: TestFormsComponent,
        }),
          new SandBoxItem({
            code: 'dkdjd',
          componentName: 'Template driven forms',
          component: TestFormsComponent,
        }),
      ]
      })
    ];
  }
}
