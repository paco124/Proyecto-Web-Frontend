import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ModificarURoutingModule } from './modificar-u-routing.module';
import { ModificarComponent } from './modificar/modificar.component';


import { MatButtonModule } from '@angular/material/button';
//import { MatCardModule } from '@angular/material/card';
import { MatNativeDateModule, MatRippleModule, MatOptionModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
//import { HighchartsChartModule } from 'highcharts-angular';
//import { MatSelectFilterModule } from 'mat-select-filter';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    ModificarComponent
  ],
  imports: [
    CommonModule,
    MatNativeDateModule,
    ModificarURoutingModule,
    MatNativeDateModule,
    MatSelectModule,MatSlideToggleModule,MatProgressSpinnerModule,MatPaginatorModule,
    MatRippleModule,MatDatepickerModule,FormsModule,ReactiveFormsModule,
    MatSelectModule,MatOptionModule,MatTableModule,
    MatTabsModule,MatButtonModule,MatIconModule,
    MatDividerModule,MatInputModule,MatCardModule
  ]
})
export class ModificarUModule { }
