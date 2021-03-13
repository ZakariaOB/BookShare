import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-unicorn-form-host',
  templateUrl: './unicorn-form-host.component.html',
  styleUrls: ['./unicorn-form-host.component.scss']
})
export class UnicornFormHostComponent implements OnInit {

  constructor() { }

  get tryCheckCreature(): string {
    return 'Try check creature ..';
  }

  ngOnInit(): void {
  }

}
