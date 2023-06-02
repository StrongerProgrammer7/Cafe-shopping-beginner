import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Message, Message_Position, Position } from "../interfaces";

@Injectable(
  {
    providedIn: 'root'
  }
)

export class PositionService
{
  constructor(private http: HttpClient)
  {

  }

  getAll(categoryId: string):Observable<Position[]>
  {
    return this.http.get<Position[]>(`/api/position/${categoryId}`)
  }

  create(position: Position): Observable<Message_Position>
  {
    return this.http.post<Message_Position>('/api/position',position);
  }

  update(position: Position): Observable<Message>
  {
    return this.http.patch<Message>(`/api/position/${position.id}`,position);
  }

  remove(id: number): Observable<Message>
  {
    return this.http.delete<Message>(`/api/position/${id}`);
  }
}
