import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from './models/user';


@Injectable({
  providedIn: 'root'
})
export class LoginService {
  constructor(private httpcient:HttpClient) { }


  // public async validateUser(user:User){
  //   const url = "";
  //   return  this.httpcient.post(url,user);
  // }
}
