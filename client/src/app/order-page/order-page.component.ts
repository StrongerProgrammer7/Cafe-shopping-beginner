import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { MaterialInstance, MaterialService } from '../shared/middleware/material.service';


@Component({
  selector: 'app-order-page',
  templateUrl: './order-page.component.html',
  styleUrls: ['./order-page.component.css']
})


export class OrderPageComponent implements AfterViewInit, OnDestroy
{

  @ViewChild('modal_finished') modal_finishedRef!: ElementRef;
  modal!: MaterialInstance;

  constructor()
  {

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
