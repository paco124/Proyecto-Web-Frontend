import { ChangeDetectorRef, Component, ElementRef, ViewChild } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, NgForm, ValidatorFn, Validators } from '@angular/forms';
import { MatSelect } from '@angular/material/select';
import * as moment from 'moment';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';
import { Subject, forkJoin, takeUntil } from 'rxjs';

@Component({
  selector: 'app-modificar',
  templateUrl: './modificar.component.html',
  styleUrls: ['./modificar.component.scss']
})
export class ModificarComponent {
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
  @ViewChild('formularioUpdate', { static: false }) formularioUpdateRefI!: NgForm;
  formulario: FormGroup;
  formularioUpdate: FormGroup;

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


  minDate:Date;


  spinner=false;

  fechareservadav:any=[];
  source:any=[];

  constructor(private formBuilder: FormBuilder, private formBuider2: FormBuilder,  private userService: UserService, private cdRef: ChangeDetectorRef) {
    this.formulario = this.formBuilder.group({
      curp: ['', [Validators.required, this.regexValidator(/^[A-Z]{4}\d{6}[HM]{1}[A-Z]{6}\d{1}$/, 'curpInvalida')]],
    });
    this.formularioUpdate = this.formBuider2.group({
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

  regexValidator(regex: RegExp, errorKey: string): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const value = control.value;
      const isValid = regex.test(value);
  
      return isValid ? null : { [errorKey]: true };
    };
  }
  ngAfterViewInit(): void {
    this.nivelI.valueChange.subscribe(value => {this.nivelv =value})
    this.municipioI.valueChange.subscribe(value => {this.municipiov =value})
    this.asuntoI.valueChange.subscribe(value => {this.asuntov =value})
  }
  async buscar(): Promise<any> {
    if(this.formulario.valid){
      this.spinner = true;
      this.buscarCita();
    }else{
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Curp Incorrecta',
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
        this.getCitaForUpdate(data);
      }
    });
  }
  getCitaForUpdate(data:any){
    this.Apis();
    this.userService.getCitasForUpdate(data).subscribe((response: any) => {
      response.data.forEach((item: any) => {
        if (item.reservacion) {
          const date = new Date(item.reservacion);
          const formattedDate = `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`;
          item.reservacion = formattedDate;
        }
        this.nombrev = item.nombre;
        this.paternov = item.paterno;
        this.maternov = item.materno;
        this.telefonov = item.telefono;
        this.nivelI.value = item.nivel;
        this.municipioI.value = item.municipio;
        this.asuntoI.value = item.asunto;
        
        this.nivelv = item.nivel
        this.municipiov =item.municipio
        this.asuntov = item.asunto
      });
      console.log(response.data)
    });
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
  actualizar(){
    this.nombreI.nativeElement.value;
    if(this.formularioUpdate.valid){
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
    this.modificar();  
  }
  async modificar(): Promise<any> {
    this.source = {
      "curp": this.curpv, "nombre": this.nombrev, "paterno": this.paternov,
      "materno": this.maternov, "telefono": this.telefonov, "nivel": this.nivelv, 
      "municipio": this.municipiov, "asunto": this.asuntov, "fechareservada": this.fechareservadav,
      "user":this.idUser
    }
    console.log(this.source)
    this.userService.updateCita(this.source).subscribe(() => {
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Cita Actualizada',
        showConfirmButton: false,
        timer: 2000
      })
      this.clear();
    })
    
  }
  clear() {
    this.formularioUpdate.reset()
    this.formularioUpdate.markAsPristine();
    this.formularioUpdate.markAsUntouched();
    this.formularioUpdateRefI.resetForm();
    this.curpv = ""
    this.nombrev = ""
    this.paternov = ""
    this.maternov = ""
    this.telefonov = ""
    this.nivelv = ""
    this.municipiov = ""
    this.asuntov = ""
  }
}
