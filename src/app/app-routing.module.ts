import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './modules/login/auth/auth.component';
import { SkeletonComponent } from './core/layout/skeleton/skeleton.component';

const routes: Routes = [
    {
      path:'',
      component: SkeletonComponent,
      children:[
        {
          path:'',
          redirectTo:'/authentication',
          pathMatch:'full'
        },
        {
          path:'User',
          loadChildren:()=>import('./modules/ticket/ticket.module').then((m)=> m.TicketModule),
          //canActivate:[AuthGuard],
        },
        {
          path:'Admin',
          loadChildren:()=>import('./modules/ticket/ticket.module').then((m)=> m.TicketModule),
          //canActivate:[AuthGuard],
        }
      ]
    },
    {
      path:'authentication',
      component: AuthComponent,
      loadChildren: ()=> import('./modules/login/login.module').then((m)=>m.LoginModule)
    }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
