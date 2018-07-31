import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';

import { TrainingService } from '../training.service';
import { Exercise } from '../exercise.model';

@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.css']
})
export class NewTrainingComponent implements OnInit, OnDestroy {
  workouts: Exercise[]; // data we get back doesn't have ID so must be type any
  trainingInProgress = false;
  workoutSubscription: Subscription;

  constructor(private trainingService: TrainingService) { }

  ngOnInit() {
    this.workoutSubscription = this.trainingService.workoutsChanged.subscribe(
      workouts => (this.workouts = workouts)
    );
    this.trainingService.fetchWorkouts();
  }

  ngOnDestroy() {
    this.workoutSubscription.unsubscribe();
  }

  startTraining(form: NgForm) {
    this.trainingService.startExercise(form.value.workout);
  }

}
