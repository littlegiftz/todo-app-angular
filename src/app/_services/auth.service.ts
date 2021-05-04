import { Injectable } from '@angular/core';
import { Router }  from '@angular/router';

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  private tokenName = 'token'

  constructor(
    private router: Router,
  ) { }

  isLoggedin() {
    let token = localStorage[this.tokenName]
    return (token) ? true : false
  }

  getToken(){
    let token = localStorage[this.tokenName]
    return (token) ? token : null
  }

  saveToken(token: string){
    localStorage.setItem(this.tokenName, token)
  }

  logout() {
    localStorage.removeItem(this.tokenName);
    this.router.navigate(['/login']);
  }
}
