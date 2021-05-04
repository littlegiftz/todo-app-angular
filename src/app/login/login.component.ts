import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpParams } from '@angular/common/http';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

import { AuthService } from '../_services/auth.service';
import { LoginService } from './login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(
    private router: Router,
    private authService: AuthService,
    private loginService: LoginService,
    private snackBar: MatSnackBar,
    private formBuilder: FormBuilder
  ) { }

  form!: FormGroup

  ngOnInit(): void {
    if(this.authService.isLoggedin()){
      this.router.navigate([''])
    }

    this.form = this.formBuilder.group({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required]),
    })
  }

  get f() { return this.form.controls; }

  login() {
    const params = new HttpParams()
    .set('email', this.f.email.value)
    .set('password', this.f.password.value);

    this.loginService.login(params).subscribe(
      (resp:any) => {
        this.authService.saveToken(resp.token)
        this.router.navigate([''])
      },
      error => {
        this.snackBar.open(error,'', {
          duration: 2000,
          verticalPosition: 'top',
          panelClass: ['mat-snackbar-error']
        });
      }
    )
  }

}
