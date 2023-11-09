import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AgendarURoutingModule } from './agendar-u-routing.module';
import { AgendarComponent } from './agendar/agendar.component';


@NgModule({
  declarations: [
    AgendarComponent
  ],
  imports: [
    CommonModule,
    AgendarURoutingModule
  ]
})
export class AgendarUModule { }
