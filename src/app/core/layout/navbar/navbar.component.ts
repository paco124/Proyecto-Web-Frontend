import { Component, Output ,EventEmitter, ViewChild} from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { Router } from '@angular/router';
interface FoodNode {
  name: string;
  children?: FoodNode[];
}
const TREE_DATA: FoodNode[] = [
  {
    name: 'Wheels',
    children: [{name: 'Discrepancias'}, {name: 'Dashboard'}],
  }
];
interface ExampleFlatNode {
  expandable: boolean;
  name: string;
  level: number;
}

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  constructor(private router: Router){}
  @ViewChild('sidenav') sidenav!: MatSidenav;
  reason = '';
  observer: any;
  ngAfterViewInit() {
    this.observer?.observe(['(max-width: 900px)']).subscribe((res: { matches: any; }) => {
      if (res.matches) {
        this.sidenav.mode = 'over';
        this.sidenav.close();
      } else {
        this.sidenav.mode = 'side';
        this.sidenav.open();
      }
    });
  }
  @Output() event = new EventEmitter()
  public openSideBar(){
    this.event.emit();
  }
  close(reason: string) {
    this.reason = reason;
    this.sidenav.close();
  }
  closeSideNav(){
    this.sidenav.close();
  }
  logout() {
    localStorage.clear();
    this.router.navigate(['/authentication'])
    this.sidenav.close();
  }
}
