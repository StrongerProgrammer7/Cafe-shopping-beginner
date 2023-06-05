import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Category, Message, Message_Categories } from "../interfaces";

@Injectable(
  {
    providedIn: "root"
  }
)

export class CategoriesService
{
  constructor(private http: HttpClient)
  {

  }

  fetch(): Observable<Message_Categories>
  {
    return this.http.get<Message_Categories>('/api/category');
  }

  getById(id: string): Observable<{success:string,category:Category}>
  {
    return this.http.get<{success:string,category:Category}>(`/api/category/${id}`);
  }

  create(name: string, image?: File): Observable<Category>
  {
    const fd = new FormData();
    if(image)
    {
      fd.append('image',image,image.name); // в контроллере image должно совпадать
    }
    fd.append('name',name);
    return this.http.post<Category>('/api/category',fd);
  }

  update(id:string,name: string, image?: File): Observable<Category>
  {
    const fd = new FormData();
    if(image)
    {
      fd.append('image',image,image.name); // в контроллере image должно совпадать
    }
    fd.append('name',name);
    return this.http.patch<Category>(`/api/category/${id}`,fd);
  }

  delete(id: string): Observable<Message>
  {
    return this.http.delete<Message>(`/api/category/${id}`);
  }
}
