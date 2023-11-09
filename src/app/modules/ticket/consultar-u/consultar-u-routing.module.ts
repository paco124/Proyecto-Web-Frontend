import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConsultarComponent } from './consultar/consultar.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'consultarUser',
    pathMatch: 'full'
  },
  {
    path: 'consultarUser',
    component: ConsultarComponent
  }];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ConsultarURoutingModule { }
