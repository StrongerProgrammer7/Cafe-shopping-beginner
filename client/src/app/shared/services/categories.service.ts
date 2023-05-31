import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Category } from "../interfaces";

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

  fetch(): Observable<{success:string,categories:Category[]}>
  {
    return this.http.get<{success:string,categories:Category[]}>('/api/category');
  }
}
