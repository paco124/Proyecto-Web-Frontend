import { Component } from '@angular/core';
import * as Highcharts from 'highcharts';
import { Subject, forkJoin, takeUntil } from 'rxjs';
import { AdminService } from 'src/app/services/admin.service';
import More from 'highcharts/highcharts-more';
More(Highcharts);


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  private destroy$ = new Subject<void>();
  spinner = false;

  Highcharts = Highcharts;
  chart1: any;
  chart2: any;

  dataChart1: any = [];
  resueltosChart1: any = [];
  fechaChart1: any = [];
  pendientesChart1: any = [];
  canceladosChart1: any = [];
  totalChart1: any = [];


  dataChart2:any=[];
  asuntoChart2:any=[];
  conteoChart2:any=[];

  constructor(private adminService: AdminService) { }
  ngOnInit() {
    this.spinner = true;
    this.Apis();
  }
  Apis() {
    forkJoin([
      this.adminService.getDataChart1().pipe(takeUntil(this.destroy$)),
      this.adminService.getDataChart2().pipe(takeUntil(this.destroy$)),
    ]).subscribe(([data1,data2]: any) => {
      this.dataChart1 = data1.data;
      this.dataChart2 = data2.data;
      this.mapChart1();
      this.mapChart2();
    });
  }
  mapChart1() {
    this.dataChart1.forEach((x: any) => {
      if (x.fecha) {
        const date = new Date(x.fecha);
        const formattedDate = `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`;
        x.fecha = formattedDate;
      }
      this.resueltosChart1.push(x.resueltos);
      this.pendientesChart1.push(x.pendientes);
      this.canceladosChart1.push(x.cancelados);
      this.totalChart1.push(x.total);
      this.fechaChart1.push(x.fecha);
    });
    this.methodchart1();
    this.spinner = false;
  }
  mapChart2() {
    this.dataChart2.forEach((x: any) => {
      this.asuntoChart2.push(x.asunto);
      this.conteoChart2.push(x.conteo);
    });
    this.methodchart2();
    this.spinner = false;
  }
  methodchart1() {
    this.chart1 = {
      chart: {
        type: 'column',
      },
      title: {
        text: 'NUMERO DE CITAS'
      },
      subtitle: {
        text: 'POR DIA'
      },
      xAxis: {
        categories: this.fechaChart1,
        gridLineWidth: 0,
      },
      yAxis: {
        gridLineWidth: 0,
        title: {
          text: 'Average'
        },
        labels: {
          style: {
            fontSize: '1.5em'
          }
        },
      },
      tooltip: {
        shared: true
      },
      plotOptions: {
        column: {
          stacking: 'normal',
          dataLabels: {
            enabled: true,
            style: {
              fontSize: '1.3em'
            }
          }
        }
      },
      series: [
        {
          name: 'Resueltos',
          data: this.resueltosChart1,
          color: 'rgb(52, 52, 188)'
        }, {
          name: 'Pendientes',
          data: this.pendientesChart1,
          color: 'rgb(182,182,182)'
        }, {
          name: 'Cancelados',
          data: this.canceladosChart1,
          color: 'rgb(118,113,113)'
        }
      ],
    }
  }
  methodchart2(){
    this.chart2 = {
      chart: {
        type: 'column',
      },
      title: {
        text: 'CONTEO POR ASUNTOS'
      },
      subtitle: {
        text: 'TOTAL DE CITAS'
      },
      xAxis: {
        categories: this.asuntoChart2,
        gridLineWidth: 0,
      },
      yAxis: {
        gridLineWidth: 0,
        title: {
          text: 'Average'
        },
        labels: {
          style: {
            fontSize: '1.5em'
          }
        },
      },
      tooltip: {
        shared: true
      },
      plotOptions: {
        column: {
          stacking: 'normal',
          dataLabels: {
            enabled: true,
            style: {
              fontSize: '1.3em'
            }
          }
        }
      },
      series: [
        {
          name: 'CITAS',
          data: this.conteoChart2,
          color: 'rgb(52, 52, 188)'
        }
      ],
    }
  }
}
