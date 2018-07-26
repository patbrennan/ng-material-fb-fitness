import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';

import { User } from './user.model';
import { AuthData } from './auth-data.model';

@Injectable()
export class AuthService {
  private user: User;
  authChanged = new Subject<boolean>();

  constructor(private router: Router) {
  }

  registerUser(authData: AuthData) {
    this.user = {
      email: authData.email,
      userId: Math.round(Math.random() * 10000).toString()
    };
    this.processAuthSuccess();
  }

  login(authData: AuthData) {
    this.user = {
      email: authData.email,
      userId: Math.round(Math.random() * 10000).toString()
    };
    this.processAuthSuccess();
  }

  logout() {
    this.user = null;
    this.authChanged.next(false);
    this.router.navigate(['/login']);
  }

  getUser() {
    // ... breaks reference type so original user cannot be modified
    return { ...this.user };
  }

  isAuth() {
    return this.user != null;
  }

  private processAuthSuccess() {
    this.authChanged.next(true);
    this.router.navigate(['/training']);
  }
}
