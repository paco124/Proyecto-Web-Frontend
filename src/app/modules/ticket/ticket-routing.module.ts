import { ModificarUModule } from './modificar-u/modificar-u.module';
import { ConsultarUModule } from './consultar-u/consultar-u.module';
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
  path:'consultar',
  loadChildren:()=>import('./consultar-u/consultar-u.module').then((m)=>m.ConsultarUModule)
},
{
  path:'modificar',
  loadChildren:()=>import('./modificar-u/modificar-u.module').then((m)=>m.ModificarUModule)
}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TicketRoutingModule { }
