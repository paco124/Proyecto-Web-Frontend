import { Component, Input, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Subject, forkJoin, takeUntil } from 'rxjs';
import { AdminService } from 'src/app/services/admin.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-tabla-generica',
  templateUrl: './tabla-generica.component.html',
  styleUrls: ['./tabla-generica.component.scss']
})
export class TablaGenericaComponent {
  private destroy$ = new Subject<void>();
  @Input() saberDeQueTipo: any;

  dataGenerica: any = [];

  spinner = false;
  datos: any = [];
  displayedColumns: string[] = [];
  displayedColumnsNames: string[] = ["ID", "DESCRIPCION"];
  dataSource!: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private userService: UserService, private adminService: AdminService) { }
  ngOnInit() {
    this.spinner = true;
    this.Apis();
  }
  Apis() {
    if (this.saberDeQueTipo == "ASUNTO") {
      forkJoin([
        this.userService.getAsuntos().pipe(takeUntil(this.destroy$)),
      ]).subscribe(([data]: any) => {
        this.dataGenerica = data.data;
        this.dataForTable();
      });
    }
    if (this.saberDeQueTipo == "ESTATUS") {
      forkJoin([
        this.userService.getEstatus().pipe(takeUntil(this.destroy$)),
      ]).subscribe(([data]: any) => {
        this.dataGenerica = data.data;
        this.dataForTable();
      });
    }
    if (this.saberDeQueTipo == "MUNICIPIO") {
      forkJoin([
        this.userService.getMunicipios().pipe(takeUntil(this.destroy$)),
      ]).subscribe(([data]: any) => {
        this.dataGenerica = data.data;
        this.dataForTable();
      });
    }
    if (this.saberDeQueTipo == "NIVEL") {
      forkJoin([
        this.userService.getNiveles().pipe(takeUntil(this.destroy$)),
      ]).subscribe(([data]: any) => {
        this.dataGenerica = data.data;
        this.dataForTable();
      });
    }
    if (this.saberDeQueTipo == "ROL") {
      forkJoin([
        this.adminService.getRoles().pipe(takeUntil(this.destroy$)),
      ]).subscribe(([data]: any) => {
        this.dataGenerica = data.data;
        this.dataForTable();
      });
    }
  }


  ngAfterViewInit(): void {
    if (this.dataSource) {
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }
  }
  dataForTable() {
    this.datos = this.dataGenerica;
    this.displayedColumns = this.getDisplayedColumns(this.datos);
    this.dataSource = new MatTableDataSource(this.datos);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.spinner = false;
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
}

getDisplayedColumns(data: any[]): string[] {
  const columns: string[] = ['id'];
  data.forEach((item: any) => {
    Object.keys(item).forEach((key, index) => {
      if (key !== 'id' && !columns.includes(key)) {
        columns.push(key);
      }
    });
  });
  return columns;
}
applyFilter(event: Event) {
  const filterValue = (event.target as HTMLInputElement).value;
  this.dataSource.filter = filterValue.trim().toLowerCase();
  if (this.dataSource.paginator) {
    this.dataSource.paginator.firstPage();
  }
}
}
