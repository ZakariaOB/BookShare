import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AccountService } from '../_services/account.service';
import { ToastrService } from 'ngx-toastr';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CountryService } from '../_services/country.service';
import { observableHandler } from '../_sandbox/dynamic-components/bshare-typeahead/bshare-typeahead.component';
import { of } from 'rxjs';
import { RegisterUser } from '../_models/register-user';
import { isNullOrUndefined } from '../_utils/isNullOrUndefined';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  @Output() cancelRegister = new EventEmitter();
  registerForm: FormGroup;
  maxDate: Date;
  validationErrors: string[] = [];
  countryIsSelected: boolean = false;

  constructor(
    private accountService: AccountService,
    private toastr: ToastrService,
    private fb: FormBuilder,
    private router: Router,
    private countryService: CountryService
  ) {}

  ngOnInit(): void {
    this.intitializeForm();
    this.maxDate = new Date();
    this.maxDate.setFullYear(this.maxDate.getFullYear() - 18);
  }

  get countrySearchHandler(): observableHandler {
    return this.countryService.searchCountries;
  }

  get citySearchHandler(): observableHandler {
    if (this.registerForm.controls['country'].value?.id) {
      return (query: string) =>
        this.countryService.searchCities(
          this.registerForm.controls['country'].value.id,
          query
        );
    }
    return (query: string) => of([]);
  }

  intitializeForm() {
    this.registerForm = this.fb.group({
      gender: ['male'],
      username: ['', Validators.required],
      knownAs: ['', Validators.required],
      dateOfBirth: ['', Validators.required],
      country: [{},Validators.required],
      city: [{value:{},disabled:true}, Validators.required],
      password: ['', [Validators.required,
        Validators.minLength(4), Validators.maxLength(8)]],
      confirmPassword: ['', [Validators.required, this.matchValues('password')]]
    });

    this.registerForm
      .get('country')
      .valueChanges.subscribe((value) => this.handleCityState(value));
  }

  handleCityState(value: any): void {
    const newCityControl = this.registerForm.get('city');
    if (value?.id) {
      newCityControl.reset({});
      newCityControl.enable();
    } else {
      newCityControl.reset({});
      newCityControl.disable();
    }
  }

  matchValues(matchTo: string): ValidatorFn {
    return (control: AbstractControl) => {
      return control?.value === control?.parent?.controls[matchTo].value
        ? null
        : { isMatching: true };
    };
  }

  register() {
    const registerModel = this.toRegisterUser(this.registerForm.value);
    this.accountService.register(registerModel).subscribe(response => {
      this.router.navigateByUrl('/members');
    }, error => {
      this.validationErrors = error;
    });
  }

  cancel() {
    this.cancelRegister.emit(false);
  }

  private toRegisterUser(formValue: any): RegisterUser {
    let result = <RegisterUser>{};

    if (isNullOrUndefined(formValue)) return result;

    result.dateOfBirth = formValue.dateOfBirth;
    result.gender = formValue.gender;
    result.knownAs = formValue.knownAs;
    result.password = formValue.password;
    result.username = formValue.username;
    if (formValue.city) {
      result.cityId = formValue.city.id;
    }
    return result;
  }
}
