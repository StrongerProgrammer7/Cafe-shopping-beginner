import { HttpClient } from '@angular/common/http'

import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { User } from '../interfaces';

@Injectable(
  {
    providedIn: 'root'
  }
)

export class AuthService
{
  private token = '';
  constructor(private http:HttpClient)
  {

  }
  register(user: User): Observable<{message:string,users:object}>
  {
    return this.http.post<{message:string,users:object}>('/api/register',user)
    .pipe(
      tap(
        ({message,users}) =>
        {
          console.log(message,users);
        }
      )
    )
  }

  login(user: User): Observable<{token:string,message:string,cookies:object}>
  {
    return this.http.post<{token:string,message:string,cookies:object}>('/api/login',user)
    .pipe(
      tap(
        ({token,message,cookies}) =>
        {
          localStorage.setItem('auth-token',token);
          this.setToken(token);
        }
      )
    )

  }

  setToken(token:string)
  {
    this.token = token;
  }

  getToken(): string
  {
    return this.token
  }

  isAuthenticated(): boolean
  {
    return !!this.token
  }

  logout()
  {
    this.setToken('');
    localStorage.clear();
  }
}
