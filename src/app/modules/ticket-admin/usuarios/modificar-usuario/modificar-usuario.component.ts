import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { MatSelect } from '@angular/material/select';
import { Subject, forkJoin, takeUntil } from 'rxjs';
import { AdminService } from 'src/app/services/admin.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-modificar-usuario',
  templateUrl: './modificar-usuario.component.html',
  styleUrls: ['./modificar-usuario.component.scss']
})
export class ModificarUsuarioComponent {
  private destroy$ = new Subject<void>();

  @ViewChild('id_user', { read: ElementRef }) iduserI!: ElementRef

  @ViewChild('user_name', { read: ElementRef }) usernameI!: ElementRef
  @ViewChild('rol') rolI!: MatSelect;

  @ViewChild('formulario', { static: false }) formularioRefI!: NgForm;
  @ViewChild('formularioUpdate', { static: false }) formularioUpdateRefI!: NgForm;
  formulario: FormGroup;
  formularioUpdate: FormGroup;

  //Variables envio de datos
  rolv: any = [];
  idUserv: any = []
  usernamev:any=[];

  dataRoles:any=[];
  roles:any =[];
  idRoles:any =[];

  spinner = false;


  constructor(private formBuilder: FormBuilder, private formBuider2: FormBuilder, private adminService: AdminService) {
    this.formulario = this.formBuilder.group({
      id_user: ['', [Validators.required, Validators.maxLength(4), Validators.pattern(/^\d{1,10}$/)]],
    });
    this.formularioUpdate = this.formBuider2.group({
      user_name: ['', [Validators.required, Validators.maxLength(15), Validators.pattern(/^[A-Za-z]+$/)]],
      rol: ['', [Validators.required]],
    });
  }
  ngAfterViewInit(): void {
    this.rolI.valueChange.subscribe(value => { this.rolv = value })
  }
  async buscar(): Promise<any> {
    if (this.formulario.valid) {
      this.spinner = true;
      this.buscarUser();
      this.Apis();
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'ID Incorrecto',
        timer: 1800
      })
      //this.clear()
    }
  }
  buscarUser() {
    this.idUserv = this.iduserI.nativeElement.value;
    const data = { "id": this.idUserv }
    this.adminService.getUser(data).subscribe((response: any) => {
      if (response.data.iD_USER = this.idUserv) {
        const user = response.data;
        this.mapUserUpdate(user);
      }
    });
  }
  mapUserUpdate(data: any) {
    this.usernameI.nativeElement.value = data.useR_NAME;
    this.usernamev = data.useR_NAME;
    this.rolI.value = data.rol;
    this.rolv = data.rol;
  }
  Apis() {
    forkJoin([
      this.adminService.getRoles().pipe(takeUntil(this.destroy$)),
    ]).subscribe(([rol]: any) => {
      this.dataRoles = rol.data;
      this.mapRoles_Users();
      //this.getUsuarios()
    });
  }
  mapRoles_Users(){
    this.dataRoles.map((x: any) => {
      this.roles.push(x.rol)
      this.idRoles.push(x.id)
    })
    // this.dataUsers.map((x: any) => {
    //   this.userNameUsers.push(x.municipio)
    //   this.idUsers.push(x.id)
    //   this.rolUsers.push(x.rol)
    // })
  }
  actualizar(){
    const posicionRoles = this.roles.findIndex((elemento: string) => elemento === this.rolv);
    this.rolv = this.idRoles[posicionRoles]
    const a = {"id":parseInt(this.idUserv), "USER_NAME": this.usernamev, "iD_ROL": this.rolv}
    this.adminService.updateUser(a).subscribe(() => {
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Usuario Actualizado',
        showConfirmButton: false,
        timer: 2000
      })
    })
  }
  clear() {
    this.formularioUpdate.reset()
    this.formularioUpdate.markAsPristine();
    this.formularioUpdate.markAsUntouched();
    this.formularioUpdateRefI.resetForm();
    this.idUserv = ""
    this.usernamev = ""
    this.rolv = ""
  }
}
