import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription, Observable } from 'rxjs';
import { Store } from '@ngrx/store';

import { TrainingService } from '../training.service';
import { Exercise } from '../exercise.model';
import { UIService } from '../../shared/ui.service';
import * as fromRoot from '../../app.reducer';

@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.css']
})
export class NewTrainingComponent implements OnInit, OnDestroy {
  isLoading$: Observable<boolean>;
  workouts: Exercise[]; // data we get back doesn't have ID so must be type any
  trainingInProgress = false;
  workoutSubscription: Subscription;
  // private loadingSubscription: Subscription;

  constructor(private trainingService: TrainingService,
              private uiService: UIService,
              private store: Store<fromRoot.State>) { }

  ngOnInit() {
    this.isLoading$ = this.store.select(fromRoot.getIsLoading);
    // this.loadingSubscription = this.uiService.loadingStateChanged.subscribe(
    //   isLoading => this.isLoading = isLoading
    // );
    this.workoutSubscription = this.trainingService.workoutsChanged.subscribe(
      workouts => this.workouts = workouts
    );
    this.fetchWorkouts();
  }

  ngOnDestroy() {
    if (this.workoutSubscription) {
      this.workoutSubscription.unsubscribe();
    }
    // if (this.loadingSubscription) {
    //   this.loadingSubscription.unsubscribe();
    // }
  }

  startTraining(form: NgForm) {
    this.trainingService.startExercise(form.value.workout);
  }

  fetchWorkouts() {
    this.trainingService.fetchWorkouts();
  }
}
