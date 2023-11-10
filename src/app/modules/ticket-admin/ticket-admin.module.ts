import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TicketAdminRoutingModule } from './ticket-admin-routing.module';
import { AgendarAComponent } from './agendar-a/agendar-a.component';
import { ConsultarAComponent } from './consultar-a/consultar-a.component';


@NgModule({
  declarations: [
    AgendarAComponent,
    ConsultarAComponent
  ],
  imports: [
    CommonModule,
    TicketAdminRoutingModule
  ]
})
export class TicketAdminModule { }
