import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AgendarComponent } from './agendar/agendar.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'agendarUser',
    pathMatch: 'full'
  },
  {
    path: 'agendarUser',
    component: AgendarComponent
  }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AgendarURoutingModule { }
