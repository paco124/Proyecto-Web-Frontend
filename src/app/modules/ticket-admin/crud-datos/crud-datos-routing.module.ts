import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CrudAsuntoComponent } from './crud-asunto/crud-asunto.component';
import { CrudEstatusComponent } from './crud-estatus/crud-estatus.component';
import { CrudMunicipiosComponent } from './crud-municipios/crud-municipios.component';
import { CrudNivelesComponent } from './crud-niveles/crud-niveles.component';
import { CrudRolesComponent } from './crud-roles/crud-roles.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'asunto',
    pathMatch: 'full'
  },
  {
    path: 'asunto',
    component: CrudAsuntoComponent
  },
  {
    path: 'estatus',
    component: CrudEstatusComponent
  },
  {
    path: 'municipios',
    component: CrudMunicipiosComponent
  },
  {
    path: 'niveles',
    component: CrudNivelesComponent
  },
  {
    path: 'roles',
    component: CrudRolesComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CrudDatosRoutingModule { }
