import {  AfterViewInit, Component, ElementRef, Input, NgModule, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Order, Orders_menu_view } from '../shared/interfaces';
import { MaterialInstance, MaterialService } from '../shared/middleware/material.service';
import { OrderService, Order_menu } from '../shared/services/order.serivce';
@Component({
  selector: 'app-order-page',
  templateUrl: './order-page.component.html',
  styleUrls: ['./order-page.component.css'],
  providers: [Order_menu]
})

export class OrderPageComponent implements OnInit,AfterViewInit,OnDestroy
{

  isRoot: boolean = false;

  @ViewChild('modal_finished') modal_finishedRef!: ElementRef;
  modal!: MaterialInstance;
  pending: boolean = false;
  allSub: Subscription = new Subscription;


  constructor(private router: Router,
              public order: Order_menu,
              private orderService: OrderService)
  {
    this.isRoot = true;
  }
  ngOnInit(): void
  {
    this.router.events.subscribe(
      {
        next: (event) =>
        {
          if(event instanceof NavigationEnd)
            this.isRoot = this.router.url === '/order';
        },
        error: (e) =>
        {
          MaterialService.toast(e.error.message);
          console.log(e,'router /order problem');
        },
        complete:()=> console.log()
      }
    )
    console.log(this.isRoot);
  }

  ngAfterViewInit(): void
  {
    this.modal = MaterialService.initModal(this.modal_finishedRef);
  }

  ngOnDestroy(): void
  {
    if(this.modal.destroy)
      this.modal.destroy();
    if(this.allSub)
      this.allSub.unsubscribe();
  }


  OnFinished()
  {
    if(this.modal.open)
      this.modal.open();
  }

  sendOrder()
  {
   this.pending = true;
   let positions = this.getStringFromArrayListPosition(this.order.list);
   const ord: Order =
   {
    list:positions
   };
   this.allSub = this.orderService.create(ord)
   .subscribe(
    {
      next:(order) =>
      {
        MaterialService.toast(`Order is added: #${order.order}`);
        this.order.clear();
        this.pending = false;
      },
      error: (e) =>
      {
        MaterialService.toast(e.error.message);
        console.log(e);
      },
      complete: () => this.onCloseModal()
    }
   )
    //this.orderService.getAll();
  }

  onDeletePosition(id:number)
  {
    this.order.remove(id);
  }

  onCloseModal()
  {
    if(this.modal.close)
      this.modal.close();
  }

  private getStringFromArrayListPosition(list: Orders_menu_view[]):string
  {
    let positions = '[';
    for(let i=0;i<list.length;i++)
    {
        positions +=`{ "id":${list[i].id}, "name":"${list[i].name}", "cost":${list[i].cost}, "count":${list[i].count} }`;
        if(i!==list.length-1)
            positions += ',';
    };

    positions += ']'
    return positions;
  }

}
