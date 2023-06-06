import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Order, Position } from "../interfaces";


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
  add(position: Position)
  {

  }
  remove()
  {

  }

  clear()
  {

  }

}
