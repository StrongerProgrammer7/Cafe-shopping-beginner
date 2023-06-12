import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, OnDestroy, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { AnalyticsData } from '../shared/interfaces';
import { MaterialService } from '../shared/middleware/material.service';
import { OrderService } from '../shared/services/order.serivce';
import Chart, { ChartTypeRegistry } from 'chart.js/auto';

@Component({
  selector: 'app-analytics-page',
  templateUrl: './analytics-page.component.html',
  styleUrls: ['./analytics-page.component.css']
})
export class AnalyticsPageComponent implements  OnDestroy, AfterViewInit
{
  oSub: Subscription = new Subscription;
  analyticsData!: AnalyticsData;

  @ViewChild('gain',{read: ElementRef}) gainRef: ElementRef | undefined;
  @ViewChild('orders', {read: ElementRef}) orderRef: ElementRef | undefined;

  pending: boolean = true;

  constructor(private orderService: OrderService,
    private readonly changeDetectorRef: ChangeDetectorRef)
  {


  }
  ngOnDestroy(): void
  {
    if(this.oSub)
      this.oSub.unsubscribe();
  }


  ngAfterViewInit(): void
  {
    this.pending = false;
    let config = this.baseConfigChart('Gain','rgb(255,99,132)',[''],[0]);

    this.oSub = this.orderService.getAnalyticsData()
    .subscribe(
      {
        next: (data) =>
        {
          this.analyticsData = data;
          console.log(this.analyticsData);
          config.labels = data.chartX.map(item => item.label);
          config.data = data.chartX.map(item => item.gain);


          setTimeout(() =>
          {
            this.createChart('line',config,this.gainRef!);
            config.label = 'Orders';
            config.color = 'rgb(255,120,35)';
            config.data =  data.chartX.map(item => item.order);
            this.createChart('line',config,this.orderRef!);
          }, 0);

          this.pending = true;
        },
        error: (e) =>
        {
          MaterialService.toast('Error with get orders to the page analytics');
          console.log(e);
        },
        complete: () => console.log('complete get orders to the page analytics')
      }
    );
  }

  private baseConfigChart(label:string,color:string,labels:string[],data:number[])
  {
    return {
      label: label,
      color: color,
      labels: labels,
      data: data
    }
  }

  private createChart(
    type:keyof ChartTypeRegistry,
    config:{
    labels:string[],label:string,data:any,color:string
  }, ref: ElementRef)
  {
    const ctx = ref.nativeElement.getContext('2d');
    ctx.canvas.height = '200px';


    const chart = new Chart(ctx, this.createConfigChart(type,config));
    chart.resize(50, 500);
  }

  private createConfigChart(type:keyof ChartTypeRegistry,
    config:{
    labels:string[],label:string,data:any,color:string
  })
  {
    return {
      type: type,
      data: {
        labels: config.labels,
        datasets: [{
          label: config.label,
          data: config.data,
          borderWidth: 1,
          borderColor:config.color

        }]
      },
      options: {
        scales: {
          y:
          {
            beginAtZero: true
          }
        }
      }
    }
  }
}
