import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WelcomeComponent } from './welcome/welcome.component';

import { AuthGuard } from './auth/auth.guard';

const routes: Routes = [
  { path: '', component: WelcomeComponent },
  // lazy load training: loadChildren: path/to/module#ClassNameModule; will lazy-load
  // anything we import in training module
  {
    path: 'training',
    loadChildren: './training/training.module#TrainingModule',
    canLoad: [AuthGuard] // must modify AuthGuard file appropriately
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  // don't forget to provide this here - a rare exception to being provided in app.module:
  providers: [AuthGuard] // leave here to keep as singleton service
})
export class AppRoutingModule {}
