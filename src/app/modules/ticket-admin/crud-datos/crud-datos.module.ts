import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CrudDatosRoutingModule } from './crud-datos-routing.module';
import { CrudAsuntoComponent } from './crud-asunto/crud-asunto.component';
import { CrudEstatusComponent } from './crud-estatus/crud-estatus.component';
import { CrudMunicipiosComponent } from './crud-municipios/crud-municipios.component';
import { CrudNivelesComponent } from './crud-niveles/crud-niveles.component';
import { CrudRolesComponent } from './crud-roles/crud-roles.component';


import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { TablaGenericaComponent } from './tabla-generica/tabla-generica.component';


@NgModule({
  declarations: [
    CrudAsuntoComponent,
    CrudEstatusComponent,
    CrudMunicipiosComponent,
    CrudNivelesComponent,
    CrudRolesComponent,
    TablaGenericaComponent
  ],
  imports: [
    CommonModule,
    CrudDatosRoutingModule,
    FormsModule, ReactiveFormsModule,MatButtonModule,MatCardModule,MatDividerModule,
    MatIconModule,MatInputModule,MatPaginatorModule, MatProgressSpinnerModule,
    MatSelectModule,MatSlideToggleModule,MatTableModule,MatTabsModule
  ]
})
export class CrudDatosModule { }
