import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from './models/user';


@Injectable({
  providedIn: 'root'
})
export class LoginService {
  constructor(private httpcient: HttpClient) { }
  public async validateUser(user: User) {
    const url = "https://localhost:7206/Login/validarUser";
    return this.httpcient.post(url, user);
  }
}
