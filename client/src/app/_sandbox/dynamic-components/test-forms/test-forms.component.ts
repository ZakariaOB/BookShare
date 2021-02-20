import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-bshare-forms',
  templateUrl: './test-forms.component.html',
  styleUrls: ['./test-forms.component.scss']
})
export class TestFormsComponent implements OnInit {
  profileForm = this.fb.group({
    firstName: ['mohamed'],
    lastName : ['boukhris'],
    country:['Maroc'],
  });
  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
  }

  onSubmit() {
    console.log(this.profileForm.value);
  }
}
