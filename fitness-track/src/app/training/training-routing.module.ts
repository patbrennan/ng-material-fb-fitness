// NOTE: Using AuthGuard here is too late - we will have loaded the whole module before
// checking if we have access.
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TrainingComponent } from './training.component';

const routes: Routes = [
  // path must be empty in order to implement lazy loading! value will be appended to path's
  // value in app-routing.module file
  { path: '', component: TrainingComponent },
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class TrainingRoutingModule {}