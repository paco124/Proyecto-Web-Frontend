import { Component, ElementRef, ViewChild } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, NgForm, ValidatorFn, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-cancelar-cita',
  templateUrl: './cancelar-cita.component.html',
  styleUrls: ['./cancelar-cita.component.scss']
})
export class CancelarCitaComponent {
  @ViewChild('curp', { read: ElementRef }) curpI!: ElementRef;
  @ViewChild('formulario', { static: false }) formularioRefI!: NgForm;
//Obtener info para user
  User: any = [];
  nombre: any = [];
  idUser: any = [];
  formulario: FormGroup;
  //Variables envio de datos
  curpv:any=[];
    
  constructor(private formBuilder: FormBuilder, private userService: UserService) {
    this.formulario = this.formBuilder.group({
      curp: ['', [Validators.required, this.regexValidator(/^[A-Z]{4}\d{6}[HM]{1}[A-Z]{6}\d{1}$/, 'curpInvalida')]],
    });
    this.User = localStorage.getItem('User');
    const parsedData = JSON.parse(this.User);
    this.nombre = parsedData.useR_NAME; // Obtener el valor de la propiedad "WIW"
    this.idUser = parsedData.iD_USER;
  }
  regexValidator(regex: RegExp, errorKey: string): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const value = control.value;
      const isValid = regex.test(value);
  
      return isValid ? null : { [errorKey]: true };
    };
  }
  validarCurp(){
    if(this.formulario.valid){
      this.buscarCita();
    }else{
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Curp Invalida',
        timer: 1800
      })
      this.clear()
    }
  }
  buscarCita(){
    this.curpv = this.curpI.nativeElement.value;
    const data ={"user": this.idUser, "curp":this.curpv}
    this.userService.validarCitaForGet(data).subscribe((response: any) => {
      if (response.data.curp = this.curpv) {
        this.cancelarCita(data);
      }
    });
  }
  cancelarCita(data:any){
    this.userService.cancelarCita(data).subscribe((response: any) => {
      console.log(response.data)
      if (response.data = 1) {
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Cita Cancelada',
          showConfirmButton: false,
          timer: 2000
        })
      }
      this.clear();
    });
  }
  clear() {
    this.formulario.reset()
    this.formulario.markAsPristine();
    this.formulario.markAsUntouched();
    this.formularioRefI.resetForm();
    this.curpv = ""
  }
}
