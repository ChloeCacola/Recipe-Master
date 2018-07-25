import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';

import { AuthService } from './auth.service';

@Injectable()
//reminder:  need interface, canactivate for auth guards 
export class AuthGuard implements CanActivate {

	constructor(private authService: AuthService) {}
  
  //returns observable, promise or bool
  //in this case will return bool
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
  		//use auth service to check if the token is present..
  		return this.authService.isAuthenticated();
  }
}

//apply this in app-routing module
//remember to provide in app module