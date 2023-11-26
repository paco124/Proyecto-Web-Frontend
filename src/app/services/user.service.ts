import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  getNiveles():any{
    return this.http.get(`https://localhost:7206/User/getNiveles`);
  }
  getMunicipios():any{
    return this.http.get(`https://localhost:7206/User/getMunicipios`);
  }
  getEstatus():any{
    return this.http.get(`https://localhost:7206/User/getEstatus`);
  }
  getAsuntos():any{
    return this.http.get(`https://localhost:7206/User/getAsuntos`);
  }
  getCitaForUser(data:any):any{
    return this.http.post(`https://localhost:7206/User/getCitasForUser`,data);
  }
  SaveCita(data:any):any{
    return this.http.post(`https://localhost:7206/User/SaveCita`,data);
  }
  cancelarCita(data:any):any{
    return this.http.post(`https://localhost:7206/User/cancelarCita`,data);
  }
  updateCita(data:any):any{
    return this.http.post(`https://localhost:7206/User/updateCita`,data);
  }
  validarCitaForGet(data:any):any{
    return this.http.post(`https://localhost:7206/User/validarCitaForGet`,data);
  }
  getCitasForUpdate(data:any):any{
    return this.http.post(`https://localhost:7206/User/getCitasForUpdate`,data);
  }
}
