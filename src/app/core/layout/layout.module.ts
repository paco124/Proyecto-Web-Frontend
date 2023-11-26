import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SkeletonComponent } from './skeleton/skeleton.component';
import { NavbarComponent } from './navbar/navbar.component';


import { RouterModule } from '@angular/router';
import { MatDividerModule } from '@angular/material/divider';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule} from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { FooterComponent } from './footer/footer.component';
import { NavbarAComponent } from './navbar-a/navbar-a.component';


@NgModule({
  declarations: [
    SkeletonComponent,
    NavbarComponent,
    FooterComponent,
    NavbarAComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    MatDividerModule,
    MatSidenavModule,
    MatToolbarModule,
    MatIconModule,
    MatMenuModule,
    MatButtonModule
  ]
})
export class LayoutModule { }
