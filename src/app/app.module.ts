import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { TodoComponent } from './todo/todo.component';
import { AccountComponent } from './account/account.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MaterialModule } from './material.module'
import { AuthGuard } from './_guard/auth.guard';
import { TokenInterceptor } from './_services/token.interceptor';
import { ErrorInterceptor } from './_services/error.interceptor';

import { TaskDialogComponent } from './todo/components/task-dialog/task-dialog.component';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { DatePipe } from '@angular/common';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    TodoComponent,
    AccountComponent,
    TaskDialogComponent
  ],
  entryComponents: [
    TaskDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MaterialModule,
  ],
  providers: [
    AuthGuard,
    DatePipe,
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    { provide: MAT_DATE_LOCALE, useValue: 'en-GB'},
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
