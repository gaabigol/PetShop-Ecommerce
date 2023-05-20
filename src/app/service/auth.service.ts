import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Security } from '../util/security.util';

@Injectable()
export class AuthService implements CanActivate {
  constructor(private router: Router) {}

  canActivate(): boolean {
    const token = Security.getToken();
    if (!token) {
      this.router.navigateByUrl('/login');
      return false;
    }
    return true;
  }
}
