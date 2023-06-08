import { AfterViewInit, Component, ElementRef, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import * as moment from 'moment';
import { Order, Position } from 'src/app/shared/interfaces';
import { MaterialInstance, MaterialService } from 'src/app/shared/middleware/material.service';


@Component({
  selector: 'app-history-list',
  templateUrl: './history-list.component.html',
  styleUrls: ['./history-list.component.css']
})
export class HistoryListComponent implements OnInit, OnDestroy, AfterViewInit
{
  @Input() orders!: Order[];
  @ViewChild('modal') modalRef!: ElementRef;
  modal!: MaterialInstance;
  currentSelectedOrder!: Order;
  constructor()
  {

  }
  ngOnInit(): void
  {

  }

  ngAfterViewInit(): void
  {
    this.modal = MaterialService.initModal(this.modalRef);
  }

  ngOnDestroy(): void
  {
    if(this.modal.destroy)
      this.modal.destroy();
  }

  public getDate(date:Date):string
  {
    return moment(date.toString()).format('DD.MM.YYYY');
  }

  public getTime(date:Date):string
  {
    return moment(date.toString()).format('LT');
  }

  public getTotalCost(list:string):string
  {

    let total = this.getArrayFromString(list).reduce(
    (accum:number,position:Position) =>
    {
      accum += position.cost * position.count!;
      return accum;
    },
    0
   );

    return total.toString();
  }

  selectOrder(order: Order)
  {
    this.currentSelectedOrder = order;
    this.currentSelectedOrder.positions = this.getArrayFromString(order.list);
    if(this.modal.open)
      this.modal.open();
  }

  closeModal()
  {
    if(this.modal.close)
      this.modal.close();
  }

  private getArrayFromString(list:string): Array<Position>
  {
    return JSON.parse(list);
  }

}
