import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './modules/login/auth/auth.component';
import { SkeletonComponent } from './core/layout/skeleton/skeleton.component';
import { AuthGuard } from './core/guards/auth.guard';
import { AuthAdminGuard } from './core/guards/auth-admin.guard';
import { NavbarAComponent } from './core/layout/navbar-a/navbar-a.component';

const routes: Routes = [
    {
      path: '',
      redirectTo: 'authentication',
      pathMatch: 'full'
    },
    {
      path:'User',
      component: SkeletonComponent,
      loadChildren:()=>import('./modules/ticket/ticket.module').then((m)=> m.TicketModule),
      canActivate:[AuthGuard]
    },
    {
      path:'Admin',
      component: NavbarAComponent,
      loadChildren:()=>import('./modules/ticket-admin/ticket-admin.module').then((m)=> m.TicketAdminModule),
      canActivate:[AuthAdminGuard]
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
