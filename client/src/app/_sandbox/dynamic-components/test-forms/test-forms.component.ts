import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { CountryService } from 'src/app/_services/country.service';
import { observableHandler } from '../typeahead-demo/typeahead-demo.component';


@Component({
  selector: 'app-bshare-forms',
  templateUrl: './test-forms.component.html',
  styleUrls: ['./test-forms.component.scss']
})
export class TestFormsComponent implements OnInit {
  profileForm = this.fb.group({
    firstName: [{value:'mohamed',disabled: true}],
    lastName : ['boukhris'],
    country:[{id:444,name:'China'}],
    city:[{value:{id:44444,name:'Beijing', countryId:444},disabled:false}],
  });
  constructor(private fb: FormBuilder, private countryService: CountryService) { }

  ngOnInit(): void {
  }
  get countrySearchHandler(): observableHandler {
    return this.countryService.searchCountries;
  }
  get citySearchHandler(): observableHandler {
    return (query:string) => this.countryService.searchCities(this.profileForm.controls['country'].value.id,query);
  }

  onSubmit() {
    console.log(this.profileForm.getRawValue());
  }
}
