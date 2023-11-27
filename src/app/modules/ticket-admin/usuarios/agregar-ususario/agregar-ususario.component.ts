import { Component, ElementRef, ViewChild } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, NgForm, ValidatorFn, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSelect } from '@angular/material/select';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import * as moment from 'moment';
import { Subject, forkJoin, takeUntil } from 'rxjs';
import { AdminService } from 'src/app/services/admin.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-agregar-ususario',
  templateUrl: './agregar-ususario.component.html',
  styleUrls: ['./agregar-ususario.component.scss']
})
export class AgregarUsusarioComponent {
  private destroy$ = new Subject<void>();

  @ViewChild('user_name', { read: ElementRef }) userNameI!: ElementRef
  @ViewChild('password', { read: ElementRef }) passwordI!: ElementRef
  @ViewChild('rol') rolI!: MatSelect;
  @ViewChild('formulario', { static: false }) formularioRefI!: NgForm;
  formulario: FormGroup;
  //info del response
  dataRoles: any = [];
  dataUsers: any = [];
  //Variables envio de datos
  userNamev:any=[];
  passwordv:any=[];
  rolv:any=[];

  //Mapeo de datos
  roles:any =[];
  idRoles:any =[];
  userNameUsers:any =[];
  idUsers:any =[];
  rolUsers:any =[];
  //Envio datos
  source:any=[];

  //tabla
  spinner =false;
  datos:any =[];
  displayedColumns: string[] = [];
  displaynameColumns: string[] = ['id','useR_NAME','rol'];
  displayedColumnsNames:string[] = ["ID","USER_NAME","ROL"];
  dataSource!: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;



  constructor( private formBuilder: FormBuilder, private adminService: AdminService) {
    this.formulario = this.formBuilder.group({
      user_name: ['', [Validators.required, Validators.maxLength(15), Validators.pattern(/^[A-Za-z]+$/)]],
      password: ['', [Validators.required, Validators.maxLength(15), Validators.pattern(/^[A-Za-z]+$/)]],
      rol: ['', [Validators.required]],
    });
  }

  ngAfterViewInit(): void {
    this.rolI.valueChange.subscribe(value => {this.rolv = value;})
    if (this.dataSource) {
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }
  }
  ngOnInit() {
    this.Apis();
  }
  Apis() {
    forkJoin([
      this.adminService.getRoles().pipe(takeUntil(this.destroy$)),
    ]).subscribe(([rol]: any) => {
      this.dataRoles = rol.data;
      this.mapRoles_Users();
      this.getUsuarios()
    });
  }
  mapRoles_Users(){
    this.dataRoles.map((x: any) => {
      this.roles.push(x.rol)
      this.idRoles.push(x.id)
    })
    this.dataUsers.map((x: any) => {
      this.userNameUsers.push(x.municipio)
      this.idUsers.push(x.id)
      this.rolUsers.push(x.rol)
    })
  }
  getUsuarios(){
    this.spinner = true;
    this.adminService.getAllUsers().subscribe((response: any) => {
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
    const columns: string[] = ['id'];
    data.forEach((item: any) => {
      Object.keys(item).forEach((key,index) => {
        if (key !== 'id' && !columns.includes(key)) {
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

  async validar(): Promise<any> {
    if(this.formulario.valid){
      this.getDatosCapturados();
    }else{
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Algun campo esta mal escrito o no fue seleccionado',
        timer: 1800
      })
      this.clear()
    }
  }
  getDatosCapturados(){
    this.userNamev = this.userNameI.nativeElement.value;
    this.passwordv = this.passwordI.nativeElement.value;
    const posicionRoles = this.roles.findIndex((elemento: string) => elemento === this.rolv);
    this.rolv = this.idRoles[posicionRoles]
    this.save();  
  }
  async save(): Promise<any> {
    this.source = {
      "useR_NAME": this.userNamev, "password": this.passwordv, "iD_ROL": this.rolv}
    console.log(this.source)
    this.adminService.insertUser(this.source).subscribe(() => {
      this.getUsuarios()
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Usuario Guardada',
        showConfirmButton: false,
        timer: 2000
      })
    })
    this.clear()
  }
  clear() {
    this.formulario.reset()
    this.formulario.markAsPristine();
    this.formulario.markAsUntouched();
    this.formularioRefI.resetForm();
    this.userNamev = ""
    this.passwordv = ""
    this.rolv = ""
    this.source = ""
  }
}
