import { Component, OnInit } from '@angular/core';
import { FormGroup , FormControl,Validators, ValidatorFn, AbstractControl} from '@angular/forms';

@Component({
  selector: 'app-text-input',
  templateUrl: './text-input.component.html',
  styleUrls: ['./text-input.component.scss'],
})
export class TextInputComponent implements OnInit {
  testForm: FormGroup;
  person = {id: 1,name: 'person'};

  ngOnInit(): void {
    this.testForm = new FormGroup({
      id: new FormControl(this.person.id),
      name: new FormControl(this.person.name, [
        Validators.required,
        Validators.minLength(4),
      ]),
    });
  }
  get name() { return this.testForm.get('name'); }

  get id() { return this.testForm.get('id'); }
}
