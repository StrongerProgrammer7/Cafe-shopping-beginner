import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Category, Message_Categories } from '../shared/interfaces';
import { CategoriesService } from '../shared/services/categories.service';

@Component({
  selector: 'app-categories-page',
  templateUrl: './categories-page.component.html',
  styleUrls: ['./categories-page.component.css']
})
export class CategoriesPageComponent implements OnInit
{

  categories$!: Observable<Message_Categories>;
  constructor(private categoriesService: CategoriesService)
  {

  }

  ngOnInit(): void
  {
     this.categories$ = this.categoriesService.fetch();
  }
}
