import { NgModule } from '@angular/core';
import { AngularFireAuthModule } from 'angularfire2/auth';

import { SharedModule } from '../shared/shared.module';
import { AuthRoutingModule } from './auth-routing.module';

import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';

@NgModule({ // always provide services in app.module for app-wide services
  imports: [
    SharedModule,
    AngularFireAuthModule,
    AuthRoutingModule,
  ],
  declarations: [
    SignupComponent,
    LoginComponent,
  ],
})
export class AuthModule { }
