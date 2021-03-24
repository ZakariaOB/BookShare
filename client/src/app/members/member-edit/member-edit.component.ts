import { Component, OnInit, ViewChild, HostListener } from '@angular/core';
import { Member } from 'src/app/_models/member';
import { User } from 'src/app/_models/user';
import { AccountService } from 'src/app/_services/account.service';
import { MembersService } from 'src/app/_services/members.service';
import { take } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  NgForm,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { of } from 'rxjs';
import { observableHandler } from 'src/app/_sandbox/dynamic-components/bshare-typeahead/bshare-typeahead.component';
import { CountryService } from 'src/app/_services/country.service';
import { isNullOrUndefined } from 'src/app/_utils/isNullOrUndefined';
import { MemberUpdate } from 'src/app/_models/member-update';
import { City } from 'src/app/_models/city';

@Component({
  selector: 'app-member-edit',
  templateUrl: './member-edit.component.html',
  styleUrls: ['./member-edit.component.css'],
})
export class MemberEditComponent implements OnInit {
  //@ViewChild('editForm') editForm: NgForm;
  editForm: FormGroup;
  member: Member;
  user: User;
  @HostListener('window:beforeunload', ['$event']) unloadNotification(
    $event: any
  ) {
    if (this.editForm.dirty) {
      $event.returnValue = true;
    }
  }

  constructor(
    private accountService: AccountService,
    private memberService: MembersService,
    private toastr: ToastrService,
    private fb: FormBuilder,
    private countryService: CountryService
  ) {
    this.accountService.currentUser$
      .pipe(take(1))
      .subscribe((user) => (this.user = user));
  }

  get countrySearchHandler(): observableHandler {
    return this.countryService.searchCountries;
  }

  get citySearchHandler(): observableHandler {
    if (this.editForm.controls['country'].value?.id) {
      return (query: string) =>
        this.countryService.searchCities(
          this.editForm.controls['country'].value.id,
          query
        );
    }
    return (query: string) => of([]);
  }

  ngOnInit(): void {
    this.editForm = this.fb.group({
      introduction: [''],
      interests: [''],
      country: [null, Validators.required],
      city: [null, Validators.required],
      lookingFor: [''],
    });
    this.loadMember();

  }

  handleCityState(value: any): void {
    const newCityControl = this.editForm.get('city');
    if (value?.id) {
      newCityControl.reset(null);
      newCityControl.enable();
    } else {
      newCityControl.reset(null);
      newCityControl.disable();
    }
  }

  loadMember() {
    this.memberService.getMember(this.user.username).subscribe((member) => {
      this.member = member;
      if (this.member) {
        this.editForm.patchValue(this.member);
        this.subscribeToCityChanges();
      }
    });
  }

  updateMember() {
    if (!this.editForm.valid) {
      return;
    }
    this.member.introduction = this.editForm.value.introduction;
    this.member.interests = this.editForm.value.interests;
    this.member.city = this.editForm.value.city;
    this.member.introduction = this.editForm.value.introduction;
    this.member.lookingFor = this.editForm.value.lookingFor;

    this.memberService.updateMember(this.member).subscribe((member: Member) => {
      this.member = member;
      this.toastr.success('Profile updated successfully');
      this.editForm.reset(this.member);
    });
  }

  private subscribeToCityChanges(): void {
    this.editForm
      .get('country')
      .valueChanges.subscribe((value) => this.handleCityState(value));
  }
}
