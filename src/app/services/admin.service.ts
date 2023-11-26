import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  constructor(private http: HttpClient) { }
  insertUser(data:any):any{
    return this.http.post(`https://localhost:7206/Admin/insertUser`,data);
  }
  getUser(data:any):any{
    return this.http.post(`https://localhost:7206/Admin/getUser`,data);
  }
  updateUser(data:any):any{
    return this.http.post(`https://localhost:7206/Admin/updateUser`,data);
  }
  deleteUser(data:any):any{
    return this.http.post(`https://localhost:7206/Admin/deleteUser`,data);
  }
  getCitasForAdmin():any{
    return this.http.get(`https://localhost:7206/Admin/getCitasForAdmin`);
  }
}
