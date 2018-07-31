<<<<<<< HEAD
import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
=======
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AngularFirestore } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
>>>>>>> 8db89cbbd9da9c4d8c9ccf6e08a373a2839c575d

import { TrainingService } from '../training.service';
import { Exercise } from '../exercise.model';

<<<<<<< HEAD
=======
import { map } from 'rxjs/operators';

>>>>>>> 8db89cbbd9da9c4d8c9ccf6e08a373a2839c575d
@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.css']
})
<<<<<<< HEAD
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
=======
export class NewTrainingComponent implements OnInit {
  workouts: Observable<any>; // data we get back doesn't have ID so must be type any
  trainingInProgress = false;

  constructor(private trainingService: TrainingService,
              private db: AngularFirestore) { }

  ngOnInit() {
    // valueChanges gives Obs, but only gives us data; no metadata
    this.workouts = this.db
      .collection('availableWorkouts')
      .snapshotChanges() // get full metadata
      .pipe(
        map(docArray => {
          return docArray.map(doc => {
            return {
              id: doc.payload.doc.id,
              ...doc.payload.doc.data() // use rest of the object's properties
            };
          });
        })
      );
  }

  startTraining(form: NgForm) {
    console.log(form);
    this.trainingService.startExercise(form.value.workout);
  }

}
>>>>>>> 8db89cbbd9da9c4d8c9ccf6e08a373a2839c575d
