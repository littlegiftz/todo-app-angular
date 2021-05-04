import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { RegisterComponent } from './register.component';
import { MaterialModule } from '../material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpParams } from '@angular/common/http';
import { RegisterService } from './register.service';
import { of } from 'rxjs';

describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;

  const registerServiceStub: jasmine.SpyObj<RegisterService> = jasmine.createSpyObj(
    'registerService',
    ['register']
  );

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegisterComponent ],
      imports: [ 
        RouterTestingModule,
        HttpClientTestingModule,
        MaterialModule,
        ReactiveFormsModule,
        BrowserAnimationsModule
      ],
      providers: [
        {
          provide: RegisterService,
          useValue: registerServiceStub
        }
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should return invalid when use incorrect email pattern', () => {
    const email = component.form.controls.email;
    email.setValue('testnotemail');
    const errors = email.errors!;
    expect(errors.required).toBeFalsy();
    expect(errors.email).toBeTruthy();
    expect(email.valid).toBeFalsy();
  });

  it('should return valid when use correct email pattern', () => {
    const email = component.form.controls.email;
    email.setValue('test@email.com');
    expect(email.valid).toBeTruthy();
  });

  it('should return invalid when password mismatch', () => {
    const email = component.form.controls.email;
    const password = component.form.controls.password;
    const confirmPassword = component.form.controls.confirmPassword;
    email.setValue('test@email.com');
    password.setValue('password');
    confirmPassword.setValue('password_mismatch');
    expect(component.form.valid).toBeFalsy();
  });

  it('should return valid when password matched', () => {
    const email = component.form.controls.email;
    const password = component.form.controls.password;
    const confirmPassword = component.form.controls.confirmPassword;
    email.setValue('test@email.com');
    password.setValue('password');
    confirmPassword.setValue('password');
    expect(component.form.valid).toBeTruthy();
  });

  it('should call service when form is valid', () => {
    const email = component.form.controls.email;
    const password = component.form.controls.password;
    const confirmPassword = component.form.controls.confirmPassword;
    email.setValue('test@email.com');
    password.setValue('password');
    confirmPassword.setValue('password');

    const params = new HttpParams()
    .set('email', email.value)
    .set('password', password.value);

    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('#btnSubmit').disabled).toBe(false);

    registerServiceStub.register.and.returnValue(of());
    fixture.nativeElement.querySelector('#btnSubmit').click();

    expect(registerServiceStub.register.calls.any()).toBeTruthy();
    expect(registerServiceStub.register).toHaveBeenCalledWith(params);
  });

});
