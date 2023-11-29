import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AdminService } from 'src/app/services/admin.service';
import { LoginService } from 'src/app/services/login.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent {
  // @Output() log = new EventEmitter<boolean>();
  submit:boolean = false;
  logeado:boolean =false;
  spinner: boolean = false;
  userForm: FormGroup = new FormGroup({
    username :new FormControl('',[Validators.required]),
    password : new FormControl('',[Validators.required])
  });

  constructor(private router: Router,private loginService:LoginService, private adminService: AdminService) {
    if(localStorage.getItem('User') !== undefined){
      this.logeado =true
    }
  }

  async onSubmit(){
    this.spinner =true
    localStorage.clear();
    this.submit = true;
    let user = this.userForm.value;
      (await this.loginService.validateUser(user)).subscribe({
        next:(res:any)=>{
          console.log(res.data.iD_ROL)
          const rol =res.data.iD_ROL
         if(rol == 2 ){
          localStorage.setItem('User',JSON.stringify(res.data));
          this.logeado =true
          this.router.navigate(['/User'])
         }else if(rol == 1){
          localStorage.setItem('User',JSON.stringify(res.data));
          this.logeado =true
          this.router.navigate(['./Admin'])
         }else{
          this.reset()
          this.submit=false;
          this.spinner =false
          this.logeado =false
          this.router.navigate(['/authentication'])
          Swal.fire({
            position: 'center',
            icon: 'error',
            title: 'Usuario Incorrecto',
            showConfirmButton: false,
            timer: 3000
          })
         }
         this.reset()
        }
      })

  }
  async registrarse(){
    let user = {"useR_NAME":this.userForm.value.username,
    "password":this.userForm.value.password, "iD_ROL":2};
    console.log(user);
    (await this.adminService.insertUser(user)).subscribe({
      next:(res:any)=>{
       if(res.error == false ){
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Usuario Guardado',
          showConfirmButton: false,
          timer: 2000
        })
       }else if(res.error == true){
        Swal.fire({
          position: 'center',
          icon: 'error',
          title: 'Usuario no guardado',
          showConfirmButton: false,
          timer: 3000
        })
       }
       this.reset()
      }
    })
  }

  reset(){
    this.userForm.reset({Usuario:'',PWD:''});
  } 
}
