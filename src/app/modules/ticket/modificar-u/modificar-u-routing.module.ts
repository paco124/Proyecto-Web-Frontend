import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ModificarComponent } from './modificar/modificar.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'modificarUser',
    pathMatch: 'full'
  },
  {
    path: 'modificarUser',
    component: ModificarComponent
  }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ModificarURoutingModule { }
