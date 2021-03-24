import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-unicorn-input',
  templateUrl: './unicorn-input.component.html',
  styleUrls: ['./unicorn-input.component.scss']
})
export class UnicornInputComponent {

  @Input() placeholder: string;
  value: any = "";

  get isSecretValue() {
    return /unicorns/.exec(this.value.toLowerCase());
  }

}
