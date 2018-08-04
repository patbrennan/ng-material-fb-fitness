import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
// import { Subscription } from 'rxjs';

import { TrainingService } from './training.service';
import * as fromTraining from './training.reducer';

@Component({
  selector: 'app-training',
  templateUrl: './training.component.html',
  styleUrls: ['./training.component.css']
})
export class TrainingComponent implements OnInit {
  workoutInProgress$: Observable<boolean>;
  // workoutSubscription: Subscription;

  constructor(private trainingService: TrainingService,
              private store: Store<fromTraining.State>) { }

  ngOnInit() {
    this.workoutInProgress$ = this.store.select(fromTraining.workoutInProgress);
    // this.workoutSubscription = this.trainingService.workoutChanged.subscribe(
    //   workout => {
    //     this.workoutInProgress = !!workout;
    //   }
    // );
  }

  // ngOnDestroy() {
  //   if (this.workoutSubscription) {
  //     this.workoutSubscription.unsubscribe();
  //   }
  // }
}
