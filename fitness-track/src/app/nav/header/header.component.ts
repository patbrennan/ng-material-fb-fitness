import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';

import * as fromRoot from '../../app.reducer';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  // set type to void because no payload/object will be emitted w/event
  @Output() sidenavToggle = new EventEmitter<void>();
  isAuth$: Observable<boolean>; // was just boolean type using service.
  // authSubscription: Subscription;

  constructor(private store: Store<fromRoot.State>,
              private authService: AuthService) { }

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
    this.authService.logout();
  }

  toggleSideNav() {
    this.sidenavToggle.emit();
  }
}
