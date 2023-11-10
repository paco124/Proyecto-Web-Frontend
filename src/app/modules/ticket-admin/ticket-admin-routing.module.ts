import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AgendarAComponent } from './agendar-a/agendar-a.component';
import { ConsultarAComponent } from './consultar-a/consultar-a.component';

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
    path: 'consultar',
    component: ConsultarAComponent
  }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TicketAdminRoutingModule { }
