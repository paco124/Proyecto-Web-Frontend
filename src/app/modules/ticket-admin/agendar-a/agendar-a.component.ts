import { AdminService } from './../../../services/admin.service';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators , AbstractControl, ValidatorFn,} from '@angular/forms';
import { MatSelect } from '@angular/material/select';
import Swal from 'sweetalert2';
import * as moment from 'moment';
import { UserService } from 'src/app/services/user.service';
import { Subject, forkJoin, takeUntil } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

const today = new Date();
const month = today.getMonth();
const year = today.getFullYear();

@Component({
  selector: 'app-agendar-a',
  templateUrl: './agendar-a.component.html',
  styleUrls: ['./agendar-a.component.scss']
})
export class AgendarAComponent {
  private destroy$ = new Subject<void>();

  @ViewChild('curp', { read: ElementRef }) curpI!: ElementRef
  @ViewChild('nombre', { read: ElementRef }) nombreI!: ElementRef
  @ViewChild('paterno', { read: ElementRef }) paternoI!: ElementRef
  @ViewChild('materno', { read: ElementRef }) maternoI!: ElementRef
  @ViewChild('telefono', { read: ElementRef }) telefonoI!: ElementRef
  @ViewChild('nivel') nivelI!: MatSelect;
  @ViewChild('municipio') municipioI!: MatSelect;
  @ViewChild('asunto') asuntoI!: MatSelect;
  @ViewChild('formulario', { static: false }) formularioRefI!: NgForm;
  formulario: FormGroup;

  //Obtener info para user
  User: any = [];
  nombre: any = [];
  idUser: any = [];
  //info del response
  dataNiveles: any = [];
  dataMunicipios: any = [];
  dataAuntos: any = [];
  //mapeo de datos
  niveles: any = [];
  idNiveles:any =[];
  municipios: any = [];
  idMunicipios:any =[];
  asuntos:any = [];
  idAsuntos:any = [];

  //Variables envio de datos
  curpv:any=[];
  nombrev:any=[];
  paternov:any=[];
  maternov:any=[];
  telefonov:any=[];
  nivelv:any=[];
  municipiov:any=[];
  asuntov:any=[];

  //Envio datos
  source:any=[];

 
  fechareservadav:any=[];
  minDate:Date;

  spinner =false;
  datos:any =[];
  displayedColumns: string[] = [];
  displaynameColumns: string[] = ['serie','Fecha','Componente','Sub-Componente','Motivo_falla','IN-OUT','OU',"PSI","WIW","Turno"];
  displayedColumnsNames:string[] = ["CURP","NOMBRE","PATERNO","MATERNO", "TELEFONO","NIVEL","MUNICIPIO","ASUNTO","FECHA_CAPTURA","RESERVACION_CITA","USUARIO","ESTATUS"];
  dataSource!: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;



   regexValidator(regex: RegExp, errorKey: string): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const value = control.value;
      const isValid = regex.test(value);
  
      return isValid ? null : { [errorKey]: true };
    };
  }


  constructor(private userService: UserService, private formBuilder: FormBuilder, private adminService: AdminService) {
    this.formulario = this.formBuilder.group({
      curp: ['', [Validators.required, this.regexValidator(/^[A-Z]{4}\d{6}[HM]{1}[A-Z]{6}\d{1}$/, 'curpInvalida')]],
      nombre: ['', [Validators.required, Validators.maxLength(15), Validators.pattern(/^[A-Za-z]+$/)]],
      paterno: ['', [Validators.required, Validators.maxLength(15), Validators.pattern(/^[A-Za-z]+$/)]],
      materno: ['', [Validators.required, Validators.maxLength(15), Validators.pattern(/^[A-Za-z]+$/)]],
      telefono: ['', [Validators.required, this.regexValidator(/^\d{10}$/, 'telefonoInvalido')]],
      nivel: ['', [Validators.required]],
      municipio: ['', [Validators.required]],
      asunto: ['', [Validators.required]],
      fecha_reservada: ['', [Validators.required]],
    });
    this.minDate = moment().add(1, 'days').toDate();
    this.User = localStorage.getItem('User');
    const parsedData = JSON.parse(this.User);
    this.nombre = parsedData.useR_NAME; // Obtener el valor de la propiedad "WIW"
    this.idUser = parsedData.iD_USER;
  }
  ngAfterViewInit(): void {
    this.nivelI.valueChange.subscribe(value => {this.nivelv =value})
    this.municipioI.valueChange.subscribe(value => {this.municipiov =value})
    this.asuntoI.valueChange.subscribe(value => {this.asuntov =value})
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
      this.userService.getNiveles().pipe(takeUntil(this.destroy$)),
      this.userService.getMunicipios().pipe(takeUntil(this.destroy$)),
      this.userService.getAsuntos().pipe(takeUntil(this.destroy$)),
    ]).subscribe(([nvl, mun, asun]: any) => {
      this.dataNiveles = nvl.data;
      this.dataMunicipios = mun.data;
      this.dataAuntos = asun.data;
      this.mapNiveles_Municipios_Asuntos();
    });
  }
  mapNiveles_Municipios_Asuntos() {
    this.dataNiveles.map((x: any) => {
      this.niveles.push(x.descripcion)
      this.idNiveles.push(x.id)
    })
    this.dataMunicipios.map((x: any) => {
      this.municipios.push(x.municipio)
      this.idMunicipios.push(x.id)
    })
    this.dataAuntos.map((x: any) => {
      this.asuntos.push(x.asunto)
      this.idAsuntos.push(x.id)
    })
  }
  onDateSelected(event: any): void {
    this.fechareservadav = moment(event.value).format('YYYY-MM-DD');
    console.log('Fecha seleccionada:', this.fechareservadav);
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
    this.curpv = this.curpI.nativeElement.value;
    this.nombrev = this.nombreI.nativeElement.value;
    this.paternov = this.paternoI.nativeElement.value;
    this.maternov = this.maternoI.nativeElement.value;
    this.telefonov = this.telefonoI.nativeElement.value;

    const posicionNivel = this.niveles.findIndex((elemento: string) => elemento === this.nivelv);
    this.nivelv = this.idNiveles[posicionNivel]

    const posicionMunicipio = this.municipios.findIndex((elemento: string) => elemento === this.municipiov);
    this.municipiov = this.idMunicipios[posicionMunicipio]

    const posicionAsunto = this.asuntos.findIndex((elemento: string) => elemento === this.asuntov);
    this.asuntov = this.idAsuntos[posicionAsunto]
    this.save();  
  }
  async save(): Promise<any> {
    this.source = {
      "curp": this.curpv, "nombre": this.nombrev, "paterno": this.paternov,
      "materno": this.maternov, "telefono": this.telefonov, "nivel": this.nivelv, 
      "municipio": this.municipiov, "asunto": this.asuntov, "fechareservada": this.fechareservadav,
      "user":this.idUser
    }
    console.log(this.source)
    this.userService.SaveCita(this.source).subscribe(() => {
      this.getCitasForUser()
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Cita Guardada',
        showConfirmButton: false,
        timer: 2000
      })
    })
    this.clear()
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
  clear() {
    this.formulario.reset()
    this.formulario.markAsPristine();
    this.formulario.markAsUntouched();
    this.formularioRefI.resetForm();
    this.curpv = ""
    this.nombrev = ""
    this.paternov = ""
    this.maternov = ""
    this.telefonov = ""
    this.nivelv = ""
    this.municipiov = ""
    this.asuntov = ""
    this.source = ""
  }
}
