import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Order } from "../interfaces";


@Injectable(
  {
    providedIn: 'root'
  }
)

export class OrderService
{

  constructor(private http: HttpClient)
  {

  }

  // getAll(categoryId: string):Observable<Position[]>
  // {
  //   return this.http.get<Position[]>(`/api/position/${categoryId}`)
  // }

  // create(position: Position): Observable<Message_Position>
  // {
  //   return this.http.post<Message_Position>('/api/position',position);
  // }

}

export class Order_menu
{
  order_menu: Order[];
  mes: string;
  private static order: Order_menu;

  static getInstance(): Order_menu
  {
    if(this.order === undefined || this.order === null)
    {
      this.order = new Order_menu();
    }

    return this.order;
  }

  private constructor()
  {
    this.order_menu = [];
    this.mes = 'hello';
  }

}
