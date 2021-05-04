import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { AccountComponent } from './account.component';
import { MaterialModule } from '../material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpParams } from '@angular/common/http';
import { AccountService } from './account.service';
import { of } from 'rxjs';

describe('AccountComponent', () => {
  let component: AccountComponent;
  let fixture: ComponentFixture<AccountComponent>;

  const accountServiceStub: jasmine.SpyObj<AccountService> = jasmine.createSpyObj(
    'accountService',
    ['savePassword']
  );

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AccountComponent ],
      imports: [ 
        RouterTestingModule,
        HttpClientTestingModule,
        MaterialModule,
        ReactiveFormsModule,
        BrowserAnimationsModule
      ],
      providers: [
        {
          provide: AccountService,
          useValue: accountServiceStub
        }
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should return invalid when new password mismatch', () => {
    const currentPassword = component.form.controls.currentPassword;
    const newPassword = component.form.controls.newPassword;
    const confirmPassword = component.form.controls.confirmPassword;
    currentPassword.setValue('oldpass');
    newPassword.setValue('newpass');
    confirmPassword.setValue('newpass_mismatch');
    expect(component.form.valid).toBeFalsy();
  });

  it('should return valid when new password matched', () => {
    const currentPassword = component.form.controls.currentPassword;
    const newPassword = component.form.controls.newPassword;
    const confirmPassword = component.form.controls.confirmPassword;
    currentPassword.setValue('oldpass');
    newPassword.setValue('newpass');
    confirmPassword.setValue('newpass');
    expect(component.form.valid).toBeTruthy();
  });

  it('should call service when form is valid', () => {
    const currentPassword = component.form.controls.currentPassword;
    const newPassword = component.form.controls.newPassword;
    const confirmPassword = component.form.controls.confirmPassword;
    currentPassword.setValue('oldpass');
    newPassword.setValue('newpass');
    confirmPassword.setValue('newpass');

    const params = new HttpParams()
    .set('old_password', currentPassword.value)
    .set('new_password', newPassword.value);

    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('#btnSubmit').disabled).toBe(false);

    accountServiceStub.savePassword.and.returnValue(of());
    fixture.nativeElement.querySelector('#btnSubmit').click();

    expect(accountServiceStub.savePassword.calls.any()).toBeTruthy();
    expect(accountServiceStub.savePassword).toHaveBeenCalledWith(params);
  });

});
