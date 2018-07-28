import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AngularFirestore } from 'angularfire2/firestore';
import { Observable } from 'rxjs';

import { TrainingService } from '../training.service';
import { Exercise } from '../exercise.model';

import { map } from 'rxjs/operators';

@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.css']
})
export class NewTrainingComponent implements OnInit {
  workouts: Observable<any>; // data we get back doesn't have ID so must be type any
  trainingInProgress = false;

  constructor(private trainingService: TrainingService,
              private db: AngularFirestore) { }

  ngOnInit() {
    // valueChanges gives Obs, but only gives us data; no metadata
    this.workouts = this.db
      .collection('availableWorkouts')
      .snapshotChanges()
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
