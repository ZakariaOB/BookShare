import { Component, OnInit } from '@angular/core';
import { SandBoxItem } from '../_sandbox/dynamic-components/sandbox-host/sandbox-item';
import { SandboxService } from '../_sandbox/dynamic-components/sandbox-host/sandbox.service';

@Component({
  selector: 'app-sandbox',
  templateUrl: './sandbox.component.html',
  styleUrls: ['./sandbox.component.css']
})
export class SandboxComponent implements OnInit {

  items: SandBoxItem[];

  constructor(private sandBoxService: SandboxService) {}

  ngOnInit() {
    this.items = this.sandBoxService.getDynamiComponentsDescriptors();
  }
}
