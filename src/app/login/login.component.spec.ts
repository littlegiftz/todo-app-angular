import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { LoginComponent } from './login.component';
import { MaterialModule } from '../material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpParams } from '@angular/common/http';
import { LoginService } from './login.service';
import { of } from 'rxjs';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  const loginServiceStub: jasmine.SpyObj<LoginService> = jasmine.createSpyObj(
    'loginService',
    ['login']
  );

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoginComponent ],
      imports: [ 
        RouterTestingModule,
        HttpClientTestingModule,
        MaterialModule,
        ReactiveFormsModule,
        BrowserAnimationsModule
      ],
      providers: [
        {
          provide: LoginService,
          useValue: loginServiceStub
        }
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
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

  it('should call service when form is valid', () => {
    const email = component.form.controls.email;
    const password = component.form.controls.password;
    email.setValue('test@email.com');
    password.setValue('password');

    const params = new HttpParams()
    .set('email', email.value)
    .set('password', password.value);

    fixture.detectChanges();

    loginServiceStub.login.and.returnValue(of());
    fixture.nativeElement.querySelector('#btnSubmit').click();

    expect(loginServiceStub.login.calls.any()).toBeTruthy();
    expect(loginServiceStub.login).toHaveBeenCalledWith(params);
  });

});
