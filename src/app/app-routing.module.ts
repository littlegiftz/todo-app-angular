import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountComponent } from './account/account.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { TodoComponent } from './todo/todo.component';
import { AuthGuard } from './_guard/auth.guard';

const routes: Routes = [
  { path: '', component: TodoComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'account', component: AccountComponent, canActivate: [AuthGuard] },
  { path: '***', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
