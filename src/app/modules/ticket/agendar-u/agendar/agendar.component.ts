import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, NgForm, Validators , AbstractControl, ValidatorFn,} from '@angular/forms';
import { MatSelect } from '@angular/material/select';
import Swal from 'sweetalert2';
import * as moment from 'moment';
import { UserService } from 'src/app/services/user.service';
import { Subject, forkJoin, takeUntil } from 'rxjs';

const today = new Date();
const month = today.getMonth();
const year = today.getFullYear();

@Component({
  selector: 'app-agendar',
  templateUrl: './agendar.component.html',
  styleUrls: ['./agendar.component.scss']
})
export class AgendarComponent {
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

  //Fecha
  start: any = [];
  end: any = [];
 
  fechareservadav:any=[];
  minDate:Date;
  
   regexValidator(regex: RegExp, errorKey: string): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const value = control.value;
      const isValid = regex.test(value);
  
      return isValid ? null : { [errorKey]: true };
    };
  }


  constructor(private userService: UserService, private formBuilder: FormBuilder) {
    this.formulario = this.formBuilder.group({
      curp: ['', [Validators.required]],
      nombre: ['', [Validators.required]],
      paterno: ['', [Validators.required]],
      materno: ['', [Validators.required]],
      telefono: ['', [Validators.required, this.regexValidator(/^\d{10}$/, 'telefonoInvalido')]],
      nivel: ['', [Validators.required]],
      municipio: ['', [Validators.required]],
      asunto: ['', [Validators.required]],
      fecha_reservada: ['', [Validators.required]],
    });
    this.minDate = moment().add(1, 'days').toDate();
    this.User = localStorage.getItem('User');
    const parsedData = JSON.parse(this.User);
    console.log(this.User)
    this.nombre = parsedData.useR_NAME; // Obtener el valor de la propiedad "WIW"
    this.idUser = parsedData.iD_USER;
  }
  ngAfterViewInit(): void {
    this.nivelI.valueChange.subscribe(value => {this.nivelv =value})
    this.municipioI.valueChange.subscribe(value => {this.municipiov =value})
    this.asuntoI.valueChange.subscribe(value => {this.asuntov =value})
    console.log
    // this.dataSourceDiscrepancias = new MatTableDataSource(this.datos);
    // this.dataSourceDPUGeneral = new MatTableDataSource(this.datosdpu);
    // if (this.dataSource) {
    //   this.dataSource.paginator = this.paginator;
    //   this.dataSource.sort = this.sort;
    // }
  }
  ngOnInit() {
    this.Apis();
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
    if(this.validarCurp() && this.formulario.valid){
      this.getDatosCapturados();
    }else{
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'No cuentas con permisos para guardar Discrepancias',
        timer: 1800
      })
      this.clear()
    }
  }

  validarCurp(){
    return true;
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
      //this.getNeumaticos()
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
