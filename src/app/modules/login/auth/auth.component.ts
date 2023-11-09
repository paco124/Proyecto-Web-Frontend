import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent {
  @Output() log = new EventEmitter<boolean>();
  submit:boolean = false;
  logeado:boolean =false;
  spinner: boolean = false;
  userForm: FormGroup = new FormGroup({
    Usuario :new FormControl('',[Validators.required]),
    PWD : new FormControl('',[Validators.required]),
    idApp: new FormControl(133)
  });

  constructor(private router: Router,private loginService:LoginService) {
    if(localStorage.getItem('User') !== undefined){
      this.logeado =true
    }
  }

  async onSubmit(){
    this.spinner =true
    localStorage.clear();
    this.submit = true;
    let user = this.userForm.value;
      // (await this.loginService.validateUser(user)).subscribe({
      //   next:(res:any)=>{
      //    if(res.STATUS=="DONE" || localStorage.getItem('User') !== null){
          
      //     localStorage.setItem('User',JSON.stringify(res));
      //     this.logeado =true
      //     this.router.navigate(['/QA'])
      //    }else{
      //     this.reset()
      //     this.submit=false;
      //     this.spinner =false
      //     this.logeado =false
      //     this.router.navigate(['/authentication'])
      //     Swal.fire({
      //       position: 'center',
      //       icon: 'error',
      //       title: 'Usuario Incorrecto',
      //       showConfirmButton: false,
      //       timer: 3000
      //     })
      //    }
      //    this.reset()
      //   }
      // })
  }

  reset(){
    this.userForm.reset({Usuario:'',PWD:''});
  } 
}
