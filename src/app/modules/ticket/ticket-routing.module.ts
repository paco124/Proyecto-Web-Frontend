import { CancelarModule } from './cancelar/cancelar.module';
import { ModificarUModule } from './modificar-u/modificar-u.module';
import { AgendarUModule } from './agendar-u/agendar-u.module';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [{
  path:'',
  redirectTo:'agendar',
  pathMatch:'full'
},
{
  path:'agendar',
  loadChildren:()=>import('./agendar-u/agendar-u.module').then((m)=>m.AgendarUModule)
},
{
  path:'modificar',
  loadChildren:()=>import('./modificar-u/modificar-u.module').then((m)=>m.ModificarUModule)
},
{
  path:'cancelar',
  loadChildren:()=>import('./cancelar/cancelar.module').then((m)=>m.CancelarModule)
}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TicketRoutingModule { }
