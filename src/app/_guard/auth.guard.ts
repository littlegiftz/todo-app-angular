import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { AuthService } from '../_services/auth.service';

@Injectable()

export class AuthGuard implements CanActivate {
	constructor(
		private router: Router,
		private authService: AuthService) { }
  
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
		if (this.authService.isLoggedin()) {
			return true;
		} 
		else {
			this.router.navigate(['/login'])
			return false;
		}
	}
}