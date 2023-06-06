import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Message_Categories, Category } from 'src/app/shared/interfaces';
import { CategoriesService } from 'src/app/shared/services/categories.service';

@Component({
  selector: 'app-order-categories',
  templateUrl: './order-categories.component.html',
  styleUrls: ['./order-categories.component.css']
})
export class OrderCategoriesComponent implements OnInit
{
  categories$!: Observable<Message_Categories>
  addPositionToOrder = false;
  categoryIdToPosition = -1;


  constructor(private categoriesService: CategoriesService)
  {

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
