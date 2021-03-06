import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TypeaheadModule } from 'ngx-bootstrap/typeahead';
import { TreeviewModule } from './treeview/treeview.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavComponent } from './nav/nav.component';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { MemberListComponent } from './members/member-list/member-list.component';
import { MemberDetailComponent } from './members/member-detail/member-detail.component';
import { ListsComponent } from './lists/lists.component';
import { MessagesComponent } from './messages/messages.component';
import { SharedModule } from './_modules/shared.module';
import { TestErrorsComponent } from './errors/test-errors/test-errors.component';
import { ErrorInterceptor } from './_interceptors/error.interceptor';
import { NotFoundComponent } from './errors/not-found/not-found.component';
import { ServerErrorComponent } from './errors/server-error/server-error.component';
import { MemberCardComponent } from './members/member-card/member-card.component';
import { JwtInterceptor } from './_interceptors/jwt.interceptor';
import { MemberEditComponent } from './members/member-edit/member-edit.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import { LoadingInterceptor } from './_interceptors/loading.interceptor';
import { PhotoEditorComponent } from './members/photo-editor/photo-editor.component';
import { TextInputComponent } from './_forms/text-input/text-input.component';
import { DateInputComponent } from './_forms/date-input/date-input.component';
import { MemberMessagesComponent } from './members/member-messages/member-messages.component';
import { AdminPanelComponent } from './admin/admin-panel/admin-panel.component';
import { HasRoleDirective } from './_directives/has-role-directive';
import { UserManagementComponent } from './admin/user-management/user-management.component';
import { PhotoManagementComponent } from './admin/photo-management/photo-management.component';
import { RolesModalComponent } from './modals/roles-modal/roles-modal.component';
import { ConfirmDialogComponent } from './modals/confirm-dialog/confirm-dialog.component';
import { SandboxComponent } from './sandbox/sandbox.component';
import { SandBoxHostComponent } from './_sandbox/dynamic-components/sandbox-host/sandbox-host.component';
import { SandboxHostDirective } from './_directives/sandbox-host.directive';
import { SandboxService } from './_sandbox/dynamic-components/sandbox-host/sandbox.service';
import { TableViewComponent } from './_sandbox/dynamic-components/table-view/table-view.component';
import { BShareTypeaheadComponent } from './_sandbox/dynamic-components/bshare-typeahead/bshare-typeahead.component';
import { TestFormsComponent } from './_sandbox/dynamic-components/test-forms/test-forms.component';
import { MessageLogComponent } from './_sandbox/message-log/message-log.component';
import { MultiSelectSamplesComponent } from './_sandbox/multi-select-test/multi-select-samples/multi-select-samples.component';
import { BshareMultiselectComponent } from './_sandbox/multi-select-test/bshare-multiselect/bshare-multiselect.component';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { HighlightDirective } from './_sandbox/directives/attribute-directives/highlight.directive';
import { DirectiveSamplesComponent } from './_sandbox/directives/directive-samples/directive-samples.component';
import { NameEditorComponent } from './_sandbox/z_reactive_forms/name-editor/name-editor.component';
import { TypeaheadDemoComponent } from './_sandbox/dynamic-components/typeahead-demo/typeahead-demo.component';
import { InputValidationComponent } from './_sandbox/dynamic-components/input-validation/input-validation.component';
import { ForbiddenNameDirective } from './_sandbox/dynamic-components/input-validation/forbidden-name.directive';
import { TemplateDemoComponent } from './_sandbox/dynamic-components/template-demo/template-demo.component';
import { TabContainerComponent } from './_sandbox/dynamic-components/template-demo/tab-container/tab-container.component';
import { UnicornInputComponent } from './_sandbox/dynamic-components/form-unicorn-samples/unicorn-input/unicorn-input.component';
import { UnicornFormHostComponent } from './_sandbox/dynamic-components/form-unicorn-samples/unicorn-form-host/unicorn-form-host.component';

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    HomeComponent,
    RegisterComponent,
    MemberListComponent,
    MemberDetailComponent,
    ListsComponent,
    MessagesComponent,
    TestErrorsComponent,
    NotFoundComponent,
    ServerErrorComponent,
    MemberCardComponent,
    MemberEditComponent,
    PhotoEditorComponent,
    TextInputComponent,
    DateInputComponent,
    MemberMessagesComponent,
    AdminPanelComponent,
    HasRoleDirective,
    UserManagementComponent,
    PhotoManagementComponent,
    RolesModalComponent,
    ConfirmDialogComponent,
    SandboxComponent,
    SandBoxHostComponent,
    SandboxHostDirective,
    TableViewComponent,
    TestFormsComponent,
    MessageLogComponent,
    BShareTypeaheadComponent,
    MultiSelectSamplesComponent,
    BshareMultiselectComponent,
    HighlightDirective,
    DirectiveSamplesComponent,
    NameEditorComponent,
    TypeaheadDemoComponent,
    InputValidationComponent,
    ForbiddenNameDirective,
    TemplateDemoComponent,
    TabContainerComponent,
    UnicornInputComponent,
    UnicornFormHostComponent
  ],
  imports: [
    TypeaheadModule.forRoot(),
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    NgxSpinnerModule,
    NgMultiSelectDropDownModule.forRoot(),
    HttpClientModule,
    TreeviewModule,
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true},
    /*{provide: HTTP_INTERCEPTORS, useClass: LoadingInterceptor, multi: true},*/
    SandboxService
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
