import {  AfterViewInit, Component, ElementRef, Input, NgModule, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { MaterialInstance, MaterialService } from '../shared/middleware/material.service';
import { Order_menu } from '../shared/services/order.serivce';
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


  constructor(private router: Router,
              private order: Order_menu)
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
  }


  OnFinished()
  {
    if(this.modal.open)
      this.modal.open();
  }

  sendOrder()
  {
    console.log('Order!');
  }

  onCloseModal()
  {
    if(this.modal.close)
      this.modal.close();
  }

}
