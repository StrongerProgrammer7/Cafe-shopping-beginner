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

  login(user: User): Observable<{tokens:string,message:string,cookies:object}>
  {
    return this.http.post<{tokens:string,message:string,cookies:object}>('/api/login',user)
    .pipe(
      tap(
        ({tokens,message,cookies}) =>
        {
          localStorage.setItem('auth-token',tokens);
          this.setToken(tokens);
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
    return this.token;
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
