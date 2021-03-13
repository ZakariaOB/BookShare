import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-template-demo',
  templateUrl: './template-demo.component.html',
  styleUrls: ['./template-demo.component.scss']
})
export class TemplateDemoComponent implements OnInit {

  @ViewChild('defaultTabButtons')
  private defaultTabButtonsTpl: TemplateRef<any>;

  ngOnInit() {
      console.log(this.defaultTabButtonsTpl);
  }
}
