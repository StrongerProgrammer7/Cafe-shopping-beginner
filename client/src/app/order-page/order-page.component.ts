import {  Component, OnDestroy, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Message_Categories, Category } from '../shared/interfaces';

import { CategoriesService } from '../shared/services/categories.service';
import { Order_menu } from '../shared/services/order.serivce';


@Component({
  selector: 'app-order-page',
  templateUrl: './order-page.component.html',
  styleUrls: ['./order-page.component.css']
})


export class OrderPageComponent implements OnInit
{
  categories$!: Observable<Message_Categories>
  addPositionToOrder = false;
  categoryIdToPosition = -1;
  // order: Order_menu;

  constructor(private categoriesService: CategoriesService)
  {
    // this.order = Order_menu.getInstance();
    // this.order.mes = 'Im created';
    // console.log(this.order.mes);
  }


  ngOnInit(): void
  {
    this.categories$ = this.categoriesService.fetch();
  }

  onSelectCategory(category:Category)
  {
    if(category.id)
      this.categoryIdToPosition = +category.id;
  }
}
