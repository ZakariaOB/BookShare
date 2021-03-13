import { Component, Input, OnInit, TemplateRef } from '@angular/core';

@Component({
  selector: 'tab-container',
  templateUrl: './tab-container.component.html',
  styleUrls: ['./tab-container.component.scss']
})
export class TabContainerComponent  {
  @Input()
  headerTemplate: TemplateRef<any>;
}
