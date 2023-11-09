import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ModificarURoutingModule } from './modificar-u-routing.module';
import { ModificarComponent } from './modificar/modificar.component';


@NgModule({
  declarations: [
    ModificarComponent
  ],
  imports: [
    CommonModule,
    ModificarURoutingModule
  ]
})
export class ModificarUModule { }
