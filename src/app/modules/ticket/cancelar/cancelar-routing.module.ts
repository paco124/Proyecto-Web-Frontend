import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CancelarCitaComponent } from './cancelar-cita/cancelar-cita.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'cancelarCita',
    pathMatch: 'full'
  },
  {
    path: 'cancelarCita',
    component: CancelarCitaComponent
  }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CancelarRoutingModule { }
