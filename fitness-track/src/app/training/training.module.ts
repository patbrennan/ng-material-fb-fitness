import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';

import { TrainingComponent } from './training.component';
import { CurrentTrainingComponent } from './current-training/current-training.component';
import { NewTrainingComponent } from './new-training/new-training.component';
import { PastTrainingsComponent } from './past-trainings/past-trainings.component';
import { StopDiagComponent } from './current-training/stop-diag.component';
import { TrainingRoutingModule } from './training-routing.module';

@NgModule({ // always provide services in app.module for app-wide services
  imports: [
    SharedModule,
    TrainingRoutingModule,
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
