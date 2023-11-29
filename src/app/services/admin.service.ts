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
  getRoles():any{
    return this.http.get(`https://localhost:7206/Admin/getRoles`);
  }
  getAllUsers():any{
    return this.http.get(`https://localhost:7206/Admin/getAllUsers`);
  }
  setEstatus(data:any):any{
    return this.http.post(`https://localhost:7206/Admin/setEstatus`,data);
  }
  getDataChart1():any{
    return this.http.get(`https://localhost:7206/Admin/getDataChart1`);
  }
  getDataChart2():any{
    return this.http.get(`https://localhost:7206/Admin/getDataChart2`);
  }
  insertAsunto(data:any):any{
    return this.http.post(`https://localhost:7206/Admin/insertAsunto`,data);
  }
  insertEstatus(data:any):any{
    return this.http.post(`https://localhost:7206/Admin/insertEstatus`,data);
  }
  insertMunicipio(data:any):any{
    return this.http.post(`https://localhost:7206/Admin/insertMunicipio`,data);
  }
  insertNivel(data:any):any{
    return this.http.post(`https://localhost:7206/Admin/insertNivel`,data);
  }
  insertRol(data:any):any{
    return this.http.post(`https://localhost:7206/Admin/insertRol`,data);
  }
}
