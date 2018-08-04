import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { StoreModule } from '@ngrx/store';

import { TrainingComponent } from './training.component';
import { CurrentTrainingComponent } from './current-training/current-training.component';
import { NewTrainingComponent } from './new-training/new-training.component';
import { PastTrainingsComponent } from './past-trainings/past-trainings.component';
import { StopDiagComponent } from './current-training/stop-diag.component';
import { TrainingRoutingModule } from './training-routing.module';

import { trainingReducer } from './training.reducer';

@NgModule({ // always provide services in app.module for app-wide services
  imports: [
    SharedModule,
    TrainingRoutingModule,
    // NOTE: must import StoreModule & use forFeature; give name, reducer function
    // allows the 'slice' in the app.reducer's reducers const to have a name, similar to 'ui'
    // This is necessary for lazy-loaded routes
    StoreModule.forFeature('training', trainingReducer),
  ],
  declarations: [
    TrainingComponent,
    CurrentTrainingComponent,
    NewTrainingComponent,
    PastTrainingsComponent,
    StopDiagComponent
  ],
  // use entryComponents when NEITHER used with a selector in a template NOR by routing
  entryComponents: [StopDiagComponent],
  exports: [],
})
export class TrainingModule { }
