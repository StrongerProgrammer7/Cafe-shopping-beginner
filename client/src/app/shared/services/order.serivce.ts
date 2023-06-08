import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Order, Orders_menu_view, Position } from "../interfaces";
import { MaterialService } from "../middleware/material.service";


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

  getAll(params: any={}):Observable<Order[]>
  {
    return this.http.get<Order[]>(`/api/order`,
    {
      params:new HttpParams(
        {
          fromObject: params
        }
      )
    });
  }

  create(order: Order): Observable<Order>
  {
    return this.http.post<Order>('/api/order',order);
  }

}

export class Order_menu
{

  list: Orders_menu_view[] = [];
  price = 0;

  add(position: Position)
  {
    if(position)
    {
      const order_position = Object.assign({},
        {
          name:position.name,
          cost: position.cost,
          count: position.count!,
          id: position.id!
        });
        let dupl_index = this.findDuplicate(order_position);
        this.price+= order_position.cost * order_position.count;
        if(dupl_index!==-1)
        {
          this.list[dupl_index].count += order_position.count;
          this.sendMessage(order_position.name,'В корзине изменен заказ');
        }else
        {
          this.list.push(order_position);
          this.sendMessage(order_position.name,'В корзину добален заказ');
        }


      }


  }
  remove(id:number)
  {
    let index = this.list.findIndex(order => order.id === id);
    this.price -= this.list[index].cost*this.list[index].count;
    this.sendMessage(this.list[index].name,'Из корзины удален заказ');
    this.list.splice(index,1);

  }

  clear()
  {
    this.list = [];
    this.price = 0;
  }
  private findDuplicate(position: Orders_menu_view): number
  {
    const dupl_ind = this.list.findIndex(order => order.id === position.id);
    if(dupl_ind >=0)
    {
      return dupl_ind;
    }else
      return -1;
  }

  private sendMessage(name_position:string,text:string)
  {
    MaterialService.toast(`${text}: ${name_position}`);
  }
}
