import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TicketAdminRoutingModule } from './ticket-admin-routing.module';
import { AgendarAComponent } from './agendar-a/agendar-a.component';
import { CancelarAComponent } from './cancelar-a/cancelar-a.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { AgregarUsusarioComponent } from './usuarios/agregar-ususario/agregar-ususario.component';
import { ModificarUsuarioComponent } from './usuarios/modificar-usuario/modificar-usuario.component';
import { EliminarUsuarioComponent } from './usuarios/eliminar-usuario/eliminar-usuario.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatNativeDateModule, MatRippleModule, MatOptionModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { HighchartsChartModule } from 'highcharts-angular';





@NgModule({
  declarations: [
    AgendarAComponent,
    CancelarAComponent,
    DashboardComponent,
    UsuariosComponent,
    AgregarUsusarioComponent,
    ModificarUsuarioComponent,
    EliminarUsuarioComponent,
    
  ],
  imports: [
    CommonModule,
    TicketAdminRoutingModule,
    MatNativeDateModule,
    MatSelectModule,MatSlideToggleModule,MatProgressSpinnerModule,MatPaginatorModule,
    MatRippleModule,MatDatepickerModule,FormsModule,ReactiveFormsModule,
    MatSelectModule,MatOptionModule,MatTableModule,
    MatTabsModule,MatButtonModule,MatIconModule,
    MatDividerModule,MatInputModule,MatCardModule, HighchartsChartModule
  ]
})
export class TicketAdminModule { }
