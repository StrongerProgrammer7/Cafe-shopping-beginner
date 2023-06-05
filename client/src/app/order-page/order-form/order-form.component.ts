import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { Category, Message_Categories } from 'src/app/shared/interfaces';
import { CategoriesService } from 'src/app/shared/services/categories.service';

@Component({
  selector: 'app-order-form',
  templateUrl: './order-form.component.html',
  styleUrls: ['./order-form.component.css']
})
export class OrderFormComponent implements OnInit
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
