import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ConsultarURoutingModule } from './consultar-u-routing.module';
import { ConsultarComponent } from './consultar/consultar.component';


@NgModule({
  declarations: [
    ConsultarComponent
  ],
  imports: [
    CommonModule,
    ConsultarURoutingModule
  ]
})
export class ConsultarUModule { }
