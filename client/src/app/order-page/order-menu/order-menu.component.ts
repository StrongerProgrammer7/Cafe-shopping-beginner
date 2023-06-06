import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { MaterialInstance, MaterialService } from 'src/app/shared/middleware/material.service';
import { Order_menu } from 'src/app/shared/services/order.serivce';

@Component({
  selector: 'app-order-menu',
  templateUrl: './order-menu.component.html',
  styleUrls: ['./order-menu.component.css']
})
export class OrderMenuComponent
{
  @Input('isAdd') isAdd: boolean = false;
  @ViewChild('modal_finished') modal_finishedRef!: ElementRef;
  modal!: MaterialInstance;
  order: Order_menu;

  constructor()
  {
    this.order = Order_menu.getInstance();
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

  onSubmit()
  {
    console.log('Order!');
  }

  onCloseModal()
  {
    if(this.modal.close)
      this.modal.close();
  }
}
