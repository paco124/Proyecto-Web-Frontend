import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { AdminService } from 'src/app/services/admin.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-eliminar-usuario',
  templateUrl: './eliminar-usuario.component.html',
  styleUrls: ['./eliminar-usuario.component.scss']
})
export class EliminarUsuarioComponent {
  @ViewChild('id', { read: ElementRef }) idI!: ElementRef;
  @ViewChild('formulario', { static: false }) formularioRefI!: NgForm;
  formulario: FormGroup;

  id:any=[];

  constructor(private formBuilder: FormBuilder, private adminService: AdminService) {
    this.formulario = this.formBuilder.group({
      id:  ['', [Validators.required, Validators.maxLength(4), Validators.pattern(/^\d{1,10}$/)]],
    });
  }

  validarForm(){
    if(this.formulario.valid){
      this.deleteUser();
    }else{
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Id Invalido',
        timer: 1800
      })
      this.clear()
    }
  }
  deleteUser(){
    this.id = this.idI.nativeElement.value;
    const data ={"id": this.id}
    this.adminService.deleteUser(data).subscribe((response: any) => {
      if (response.data == 1) {
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Cita Cancelada',
          showConfirmButton: false,
          timer: 2000
        })
      }else if(response.data == 0){
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'No existe usuario con ese id',
          timer: 1800
        })
      }
    });
  }

  
  clear() {
    this.formulario.reset()
    this.formulario.markAsPristine();
    this.formulario.markAsUntouched();
    this.formularioRefI.resetForm();
    this.id = ""
  }
}
