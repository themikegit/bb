import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}

  private admins = [
    'yLo8VWJG0vaieyJtKdLomjUpUhV2',
    'YkdAANXaC2P9K6eb4tF0BMCRNfv1',
  ];
  private user = JSON.parse(localStorage.getItem('user')!)?.uid;

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    if (!this.user) {
      this.router.navigate(['sign-in']);
    }

    if (route.routeConfig?.path === 'admin') {
      if (this.admins.includes(this.user)) {
        return true;
      } else {
        this.router.navigate(['sign-in']);
      }
    }

    return true;
  }
}
