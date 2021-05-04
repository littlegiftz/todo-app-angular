import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpParams } from '@angular/common/http';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

import { MustMatch } from '../_helpers/must-match.validator';
import { AuthService } from '../_services/auth.service';
import { AccountService } from './account.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit {

  constructor(
    private router: Router,
    private accountService: AccountService,
    private snackBar: MatSnackBar,
    private formBuilder: FormBuilder
  ) { }

  form!: FormGroup  

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      currentPassword: new FormControl('', [Validators.required]),
      newPassword: new FormControl('', [Validators.required]),
      confirmPassword: new FormControl('', [Validators.required])
    },{
      validator: MustMatch('newPassword', 'confirmPassword')
    })
  }

  get f() { return this.form.controls; }

  submit() {
    
    if (this.form.invalid) {
      return;
    }

    const params = new HttpParams()
    .set('old_password', this.f.currentPassword.value)
    .set('new_password', this.f.newPassword.value);

    this.accountService.savePassword(params).subscribe(
      (resp:any) => {
        this.snackBar.open('Password Updated','', {
          duration: 2000,
          verticalPosition: 'top',
          panelClass: ['mat-snackbar-success']
        })
        this.router.navigate(['/'])
      },
      error => {
        console.log(error)
        this.snackBar.open('Error','', {
          duration: 2000,
          verticalPosition: 'top',
          panelClass: ['mat-snackbar-error']
        })
      }
    )
  }

}
