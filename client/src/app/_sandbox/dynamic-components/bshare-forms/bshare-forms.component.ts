import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-bshare-forms',
  templateUrl: './bshare-forms.component.html',
  styleUrls: ['./bshare-forms.component.scss']
})
export class BShareFormsComponent implements OnInit {
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
