import { AdminService } from 'src/app/services/admin.service';
import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { Subject, forkJoin, takeUntil } from 'rxjs';
import Swal from 'sweetalert2';
import { Location } from '@angular/common';


@Component({
  selector: 'app-insert-generico',
  templateUrl: './insert-generico.component.html',
  styleUrls: ['./insert-generico.component.scss']
})
export class InsertGenericoComponent {
  private destroy$ = new Subject<void>();
  @Input() saberDeQueTipo: any;

  @ViewChild('dato', { read: ElementRef }) datoI!: ElementRef;
  @ViewChild('formulario', { static: false }) formularioRefI!: NgForm;
  formulario: FormGroup;
  //Variables envio de datos
  datov:any=[];

  constructor(private formBuilder: FormBuilder, private adminService: AdminService,private location: Location) {
    this.formulario = this.formBuilder.group({
      dato: ['', [Validators.required, Validators.maxLength(30), Validators.pattern(/^[A-Za-z]+$/)]],    
    });
  }
  onSubmit() {
    if(this.formulario.valid){
      this.Apis();
    }
  }
  Apis() {
    this.datov =this.datoI.nativeElement.value;
    const data={"descripcion": this.datov}
    const resp=[];
    if (this.saberDeQueTipo == "ASUNTO") {
      forkJoin([
        this.adminService.insertAsunto(data).pipe(takeUntil(this.destroy$)),
      ]).subscribe(([data]: any) => {
        this.sweetAlert(data.data);
      });
    }
    if (this.saberDeQueTipo == "ESTATUS") {
      forkJoin([
        this.adminService.insertEstatus(data).pipe(takeUntil(this.destroy$)),
      ]).subscribe(([data]: any) => {
        this.sweetAlert(data.data);
      });
    }
    if (this.saberDeQueTipo == "MUNICIPIO") {
      forkJoin([
        this.adminService.insertMunicipio(data).pipe(takeUntil(this.destroy$)),
      ]).subscribe(([data]: any) => {
        this.sweetAlert(data.data);
      });
    }
    if (this.saberDeQueTipo == "NIVEL") {
      forkJoin([
        this.adminService.insertNivel(data).pipe(takeUntil(this.destroy$)),
      ]).subscribe(([data]: any) => {
        this.sweetAlert(data.error);
      });
    }
    if (this.saberDeQueTipo == "ROL") {
      forkJoin([
        this.adminService.insertRol(data).pipe(takeUntil(this.destroy$)),
      ]).subscribe(([data]: any) => {
        this.sweetAlert(data.data);
      });
    }
  }
  sweetAlert(error:any){
    if(error ==false){
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Elemento Guardado',
        showConfirmButton: false,
        timer: 2000
      })
    }else{
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Ha ocurrido un error',
        timer: 1800
      })
    }
  }
}
