import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isLoggedIn = false;
  user: any;
  role: number | undefined;
  constructor() { }

  public async isAuthenticated() {
    this.user = localStorage.getItem('User');
    return (this.user != null) ? true : false;

  }
  public returnRole() {
    this.user = localStorage.getItem('User');
    if (this.user != null) {
      let json = JSON.parse(this.user);
      let role = json.iD_ROL;
      return role;
    }
  }
}
