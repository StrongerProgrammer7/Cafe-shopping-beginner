import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Order, Position } from '../shared/interfaces';
import { MaterialService } from '../shared/middleware/material.service';
import { OrderService } from '../shared/services/order.serivce';

@Component({
  selector: 'app-analytics-page',
  templateUrl: './analytics-page.component.html',
  styleUrls: ['./analytics-page.component.css']
})
export class AnalyticsPageComponent implements OnInit, OnDestroy
{
  oSub: Subscription = new Subscription;
  orders: Order[] =[];
  constructor(private orderService: OrderService)
  {

  }
  ngOnDestroy(): void
  {
    if(this.oSub)
      this.oSub.unsubscribe();
  }
  ngOnInit(): void
  {
    this.oSub = this.orderService.getAllOrders()
    .subscribe(
      {
        next: (orders) =>
        {
          this.orders = orders;
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

  getMiddleSum(): string
  {
    let count = 0;
    let total = 0;
    for(let i=0;i<this.orders.length;i++)
    {
      total +=  this.getArrayFromString(this.orders[i].list).reduce(
        (accum:number,position:Position) =>
        {
          accum += position.cost * position.count!;
          return accum;
        },
        0
      );
      count++;
    }

    return (total/count ).toString();
  }

  private getArrayFromString(list:string): Array<Position>
  {
    return JSON.parse(list);
  }

}
