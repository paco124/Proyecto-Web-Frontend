import { AdminService } from './../../../services/admin.service';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, NgForm, ValidatorFn, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSelect } from '@angular/material/select';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Subject, forkJoin, takeUntil } from 'rxjs';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-cancelar-a',
  templateUrl: './cancelar-a.component.html',
  styleUrls: ['./cancelar-a.component.scss']
})
export class CancelarAComponent {
  private destroy$ = new Subject<void>();
  
  @ViewChild('curp', { read: ElementRef }) curpI!: ElementRef;
  @ViewChild('estatus') estatusI!: MatSelect;
  @ViewChild('formulario', { static: false }) formularioRefI!: NgForm;

  formulario: FormGroup;
  //Variables envio de datos
  curpv:any=[];
  estatusv:any=[];

  spinner=false;
  dataEstatus:any=[];
  estatuss: any = [];
  idestatus:any=[];
  source:any=[];
  
  datos:any =[];
  displayedColumns: string[] = [];
  displaynameColumns: string[] = ['serie','Fecha','Componente','Sub-Componente','Motivo_falla','IN-OUT','OU',"PSI","WIW","Turno"];
  displayedColumnsNames:string[] = ["CURP","NOMBRE","PATERNO","MATERNO", "TELEFONO","NIVEL","MUNICIPIO","ASUNTO","FECHA_CAPTURA","RESERVACION_CITA","USUARIO","ESTATUS","TURNO"];
  dataSource!: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;


  constructor(private formBuilder: FormBuilder, private adminService: AdminService, private userService : UserService) {
    this.formulario = this.formBuilder.group({
      curp: ['', [Validators.required, this.regexValidator(/^[A-Z]{4}\d{6}[HM]{1}[A-Z]{6}\d{1}$/, 'curpInvalida')]],
      estatus: ['', [Validators.required]],
    });

  }
  regexValidator(regex: RegExp, errorKey: string): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const value = control.value;
      const isValid = regex.test(value);
      return isValid ? null : { [errorKey]: true };
    };
  }
  ngAfterViewInit(): void {
    this.estatusI.valueChange.subscribe(value => {this.estatusv =value})
    if (this.dataSource) {
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }
  }
  ngOnInit() {
    this.Apis();
    this.getCitasForUser();
  }
  Apis() {
    forkJoin([
      this.userService.getEstatus().pipe(takeUntil(this.destroy$)),
    ]).subscribe(([est]: any) => {
      this.dataEstatus = est.data;
      this.mapEstatus();
    });
  }
  mapEstatus(){
    this.dataEstatus.map((x: any) => {
      this.estatuss.push(x.estatus)
      this.idestatus.push(x.id)
    })
  }
  getCitasForUser() {
    this.spinner = true;
    this.adminService.getCitasForAdmin().subscribe((response: any) => {
      response.data.forEach((item: any) => {
        if (item.reservacion) {
          const date = new Date(item.reservacion);
          const formattedDate = `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`;
          item.reservacion = formattedDate;
        }
        if (item.fecha) {
          const date = new Date(item.fecha);
          const formattedDate = `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
          item.fecha = formattedDate;
        }
      });
      this.datos = response.data
      this.displayedColumns = this.getDisplayedColumns(this.datos);
      this.dataSource = new MatTableDataSource(this.datos);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.spinner =false;
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }
  getDisplayedColumns(data: any[]): string[] {
    const columns: string[] = ['curp'];
    data.forEach((item: any) => {
      Object.keys(item).forEach((key,index) => {
        if (key !== 'serie' && !columns.includes(key)) {
          columns.push(key);
        }
      });
    });
    return columns;
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  validarCurp(){
    if(this.formulario.valid){
      this.getDatosCapturados();
    }else{
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Curp Invalida',
        timer: 1800
      })
      this.clear();
    }
  }

  getDatosCapturados(){
    this.curpv = this.curpI.nativeElement.value;
    const posicionNivel = this.estatuss.findIndex((elemento: string) => elemento === this.estatusv);
    this.estatusv = this.idestatus[posicionNivel]
    this.modificar();  
  }
  async modificar(): Promise<any> {
    this.source = {"curp": this.curpv, "id":this.estatusv}
    this.adminService.setEstatus(this.source).subscribe((response: any) => {
      if (response.data == 1) {
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Estatus Modificado',
          showConfirmButton: false,
          timer: 2000
        });
        this.getCitasForUser();
      }else if(response.data == 0){
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'El estatus no fue modificado',
          timer: 1800
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
    this.estatusv = ""
  }
}
