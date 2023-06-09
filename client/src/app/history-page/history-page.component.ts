import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';

import { Subscription } from 'rxjs/internal/Subscription';
import { Filter, Order } from '../shared/interfaces';
import { MaterialInstance, MaterialService } from '../shared/middleware/material.service';
import { OrderService } from '../shared/services/order.serivce';

@Component({
  selector: 'app-history-page',
  templateUrl: './history-page.component.html',
  styleUrls: ['./history-page.component.css']
})

export class HistoryPageComponent implements OnInit,OnDestroy,AfterViewInit
{
  isFilterVisible = false;
  @ViewChild('tooltip') tooltipRef!: ElementRef;
  tooltip!: MaterialInstance;

  oSub:Subscription = new Subscription;
  orders: Order[] = [];
  limit:number = 2;
  offset:number = 0;
  loading: boolean = false;
  reloading: boolean = false;
  finishedData: boolean = false;
  filter: Filter = {};
  private STEP:number = 2;

  constructor(private orderService: OrderService)
  {

  }
  ngOnInit(): void
  {
    this.getData();
  }


  ngOnDestroy(): void
  {
    this.oSub.unsubscribe();
    this.loading = false;
    this.reloading = false;
  }
  ngAfterViewInit(): void
  {
    MaterialService.initTooltip(this.tooltipRef);
  }

  loadMore()
  {
    this.loading = true;
    this.offset +=this.STEP;
    this.getData();
    this.loading = false;
  }

  private getData()
  {
     //#1 orders$!: Observable<Order[]>;
      const params = Object.assign({},this.filter,
        {
          offset: this.offset,
          limit: this.limit
        });
      this.oSub =  this.orderService.getAll_byParams(params)
      .subscribe(
      {
        next:(orders) =>
        {
          this.finishedData = orders.length < this.STEP;
          this.orders = this.orders.concat(orders);
          this.reloading = false;

        },
        error: (e) =>
        {
          MaterialService.toast('e.error.message');
          console.log(e);
        },
        complete: () => console.log()
      }
    )

  }

  applyFilter(filter:Filter)
  {
    this.orders = [];
    this.offset = 0;
    this.reloading = true;
    this.filter = filter;
    this.getData();

  }

  isFiltered(): boolean
  {
    return Object.keys(this.filter).length!==0
  }

}
