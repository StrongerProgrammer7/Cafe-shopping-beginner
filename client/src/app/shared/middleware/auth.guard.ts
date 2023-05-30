import { inject, Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivateChildFn, CanActivateFn, Router, RouterStateSnapshot } from "@angular/router";
import { Observable, of } from "rxjs";
import { AuthService } from "../services/auth.service";

@Injectable(
  {
    providedIn: 'root'
  }
)

export class AuthGuad
{

  constructor(private auth: AuthService,
              private router: Router)
  {

  }
  canActivate(): Observable<boolean>
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

  canActivateChild(): Observable<boolean>
  {
    return this.canActivate();
  }
}

export const canActivateLogin: CanActivateFn =
(route: ActivatedRouteSnapshot,state: RouterStateSnapshot) =>
{
  return inject(AuthGuad).canActivate();
}

export const canActivateChildLogin: CanActivateChildFn =
(childRoute: ActivatedRouteSnapshot,state: RouterStateSnapshot) =>
{
  return inject(AuthGuad).canActivateChild();
}
