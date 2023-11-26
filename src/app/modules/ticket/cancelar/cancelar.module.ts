import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CancelarRoutingModule } from './cancelar-routing.module';
import { CancelarCitaComponent } from './cancelar-cita/cancelar-cita.component';
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


@NgModule({
  declarations: [
    CancelarCitaComponent
  ],
  imports: [
    CommonModule,
    CancelarRoutingModule,
    MatNativeDateModule,
    MatSelectModule,MatSlideToggleModule,MatProgressSpinnerModule,MatPaginatorModule,
    MatRippleModule,MatDatepickerModule,FormsModule,ReactiveFormsModule,
    MatSelectModule,MatOptionModule,MatTableModule,
    MatTabsModule,MatButtonModule,MatIconModule,
    MatDividerModule,MatInputModule,MatCardModule
  ]
})
export class CancelarModule { }
