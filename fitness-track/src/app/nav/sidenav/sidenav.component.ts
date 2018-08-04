import { Component, Output, EventEmitter, OnInit } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';

import * as fromRoot from '../../app.reducer';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent implements OnInit {
  @Output() sideNavClose = new EventEmitter<void>();
  isAuth$: Observable<boolean>;
  // authSubscription: Subscription;

  constructor(private authService: AuthService,
              private store: Store<fromRoot.State>) { }

  ngOnInit() {
    this.isAuth$ = this.store.select(fromRoot.getIsAuth);
    // this.authSubscription = this.authService.authChanged.subscribe(authStatus => {
    //   this.isAuth = authStatus;
    // });
  }

  // ngOnDestroy() {
  //   this.authSubscription.unsubscribe();
  // }

  onLogout() {
    this.closeSideNav();
    this.authService.logout();
  }

  closeSideNav() {
    this.sideNavClose.emit();
  }

}
