import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import * as moment from 'moment';
import { Subscription } from 'rxjs';
import { Analytics } from '../shared/interfaces';
import { MaterialInstance, MaterialService } from '../shared/middleware/material.service';
import { OrderService } from '../shared/services/order.serivce';

@Component({
  selector: 'app-overview-page',
  templateUrl: './overview-page.component.html',
  styleUrls: ['./overview-page.component.css']
})
export class OverviewPageComponent implements OnInit, OnDestroy, AfterViewInit
{
  @ViewChild('tapTarget') tapTargetRef!: ElementRef;
  tapTarget!: MaterialInstance;
  oSub: Subscription = new Subscription;
  analytics!: Analytics;

  constructor(private orderService: OrderService)
  {

  }
  ngOnInit(): void
  {
    this.oSub = this.orderService.getOverviewsByOrder()
    .subscribe(
      {
        next: (value) =>
        {
          this.analytics = value;

        },
        error: (e) =>
        {
          MaterialService.toast('Error with get analytics look console:');
          console.error(e);
        },
        complete: () => console.log()
      }
    )
  }

  ngOnDestroy(): void
  {
    if(this.oSub)
      this.oSub.unsubscribe();
    if(this.tapTarget.destroy)
      this.tapTarget.destroy();
  }

  ngAfterViewInit(): void
  {
    this.tapTarget = MaterialService.initTapTarget(this.tapTargetRef);
  }

  getDate(): string
  {
    let date = new Date();
    date.setDate(date.getDate() -1);
    return moment(date).format('DD.MM.YYYY');
  }

  openInfoModel()
  {
    if(this.tapTarget.open)
      this.tapTarget.open();
  }
}
