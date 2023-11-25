import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthAdminGuard implements CanActivate {
  constructor(private service:AuthService, private router:Router){

  }
  
  // public async canActivate(
  //   route: ActivatedRouteSnapshot,
  //   state: RouterStateSnapshot){
  //   let auth =this.service.isAuthenticated();
  //   return (await auth)?auth:  this.router.navigate(['/']);
  // }
 public async canActivate(
    childRoute: ActivatedRouteSnapshot,
    state: RouterStateSnapshot) {
      let rol = this.service.returnRole();
      if(rol ==1){
        return true;
      }else{
        localStorage.clear();
        return this.router.navigate(['/authentication']);
      }
  }
  
}
