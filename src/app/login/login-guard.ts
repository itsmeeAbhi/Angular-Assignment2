import { Injectable } from '@angular/core';
import {
  CanActivate,
  Router
} from '@angular/router';
import { Observable } from 'rxjs';
import { LoginService } from '../Services/login.service';


@Injectable({ providedIn: 'root' })
export class LoginGuard implements CanActivate {
  constructor(private authService: LoginService, private router: Router) { }

  canActivate(
  ): Observable<boolean> | Promise<boolean> | boolean {
    return this.authService.islogout()
      .then(
        (authenticated: boolean) => {
          if (authenticated) {
            return true;
          } else {
            this.router.navigate(['/home'])
          }
        });
  }
}