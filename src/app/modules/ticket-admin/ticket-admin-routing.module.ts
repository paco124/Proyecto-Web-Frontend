import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AgendarAComponent } from './agendar-a/agendar-a.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CancelarAComponent } from './cancelar-a/cancelar-a.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { CrudDatosComponent } from './crud-datos/crud-datos.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'agendarAdmin',
    pathMatch: 'full'
  },
  {
    path: 'agendarAdmin',
    component: AgendarAComponent
  },
  {
    path: 'dashboard',
    component: DashboardComponent
  },
  {
    path: 'cambiarEstatusCita',
    component: CancelarAComponent
  },
  {
    path: 'usuarios',
    component: UsuariosComponent
  },
  {
    path: 'CRUDdatos',
    component: CrudDatosComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TicketAdminRoutingModule { }
