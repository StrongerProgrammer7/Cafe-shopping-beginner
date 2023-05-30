import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivateChildFn, CanActivateFn, Router, RouterStateSnapshot } from "@angular/router";
import { Observable, of } from "rxjs";
import { AuthService } from "../services/auth.service";

@Injectable(
  {
    providedIn: 'root'
  }
)

export class AuthGuad implements CanActivateFn,CanActivateChildFn
{

  constructor(private auth: AuthService,
              private router: Router)
  {

  }
  canActivateFn(route: ActivatedRouteSnapshot,state: RouterStateSnapshot): Observable<boolean>
  {
    if(this.auth.isAuthenticated())
      return of(true)

    this.router.navigate(['/login'],
    {
      queryParams:
      {
        accessDenied: true
      }
    });
    return of(false);
  }

  canActivateChildFn(route: ActivatedRouteSnapshot,state: RouterStateSnapshot): Observable<boolean>
  {
    return this.canActivateFn(route,state);
  }
}
