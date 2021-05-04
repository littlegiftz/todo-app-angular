import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpParams } from '@angular/common/http';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

import { MustMatch } from '../_helpers/must-match.validator';
import { AuthService } from '../_services/auth.service';
import { RegisterService } from './register.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  
  constructor(
    private router: Router,
    private authService: AuthService,
    private registerService: RegisterService,
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
      confirmPassword: new FormControl('', [Validators.required])
    },{
      validator: MustMatch('password', 'confirmPassword')
    })
  }

  get f() { return this.form.controls; }

  register() {
    
    if (this.form.invalid) {
      return;
    }

    const params = new HttpParams()
    .set('email', this.f.email.value)
    .set('password', this.f.password.value);

    this.registerService.register(params).subscribe(
      (resp:any) => {
        this.snackBar.open('Register Completed','', {
          duration: 2000,
          verticalPosition: 'top',
          panelClass: ['mat-snackbar-success']
        })
        this.router.navigate(['/login'])
      },
      error => {
        this.snackBar.open(error,'', {
          duration: 2000,
          verticalPosition: 'top',
          panelClass: ['mat-snackbar-error']
        })
      }
    )
  }

}
