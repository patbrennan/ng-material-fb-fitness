import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';

import { TrainingService } from '../training.service';
import { Exercise } from '../exercise.model';
import * as fromTraining from '../training.reducer';
import * as fromRoot from '../../app.reducer';

@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.css']
})
export class NewTrainingComponent implements OnInit {
  isLoading$: Observable<boolean>;
  workouts$: Observable<Exercise[]>;
  trainingInProgress$: Observable<boolean>;
  // workoutSubscription: Subscription;
  // private loadingSubscription: Subscription;

  constructor(private trainingService: TrainingService,
              private store: Store<fromTraining.State>) { }

  ngOnInit() {
    this.isLoading$ = this.store.select(fromRoot.getIsLoading);
    // this.loadingSubscription = this.uiService.loadingStateChanged.subscribe(
    //   isLoading => this.isLoading = isLoading
    // );
    this.workouts$ = this.store.select(fromTraining.getAvailableWorkouts);
    this.trainingInProgress$ = this.store.select(fromTraining.workoutInProgress);
    // this.workoutSubscription = this.trainingService.workoutsChanged.subscribe(
    //   workouts => this.workouts = workouts
    // );
    this.fetchWorkouts();
  }

  // ngOnDestroy() {
  //   if (this.workoutSubscription) {
  //     this.workoutSubscription.unsubscribe();
  //   }
  //   // if (this.loadingSubscription) {
  //   //   this.loadingSubscription.unsubscribe();
  //   // }
  // }

  startTraining(form: NgForm) {
    this.trainingService.startExercise(form.value.workout);
  }

  fetchWorkouts() {
    this.trainingService.fetchWorkouts();
  }
}
