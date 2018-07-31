import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { AngularFirestore } from 'angularfire2/firestore';
import { map } from 'rxjs/operators';

import { Exercise } from './exercise.model';

@Injectable({
  providedIn: 'root'
})
export class TrainingService {
  workoutChanged = new Subject<Exercise>();
  workoutsChanged = new Subject<Exercise[]>();
  private workouts: Exercise[] = [];
  private runningExercise: Exercise;
  private exercises: Exercise[] = [];

  constructor(private db: AngularFirestore) { }

  fetchWorkouts() {
    // valueChanges gives Obs, but only gives us data; no metadata - snapshotChanges gives all
    this.db.collection('availableWorkouts')
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
      )
      .subscribe((workouts: Exercise[]) => {
        this.workouts = workouts;
        this.workoutsChanged.next([...this.workouts]); // emit event
      });
  }

  startExercise(selectedId: string) {
    this.runningExercise = this.workouts.find(workout => workout.id === selectedId);
    this.workoutChanged.next({...this.runningExercise});
  }

  completeExercise() {
    this.exercises.push({
      ...this.runningExercise,
      date: new Date(),
      state: 'completed'
    });
    this.runningExercise = null;
    this.workoutChanged.next(null);
  }

  cancelExercise(progress: number) {
    this.exercises.push({
      ...this.runningExercise,
      duration: this.runningExercise.duration * (progress / 100),
      calories: this.runningExercise.calories * (progress / 100),
      date: new Date(),
      state: 'cancelled'
    });
    this.runningExercise = null;
    this.workoutChanged.next(null);
  }

  currentExercise() {
    return { ...this.runningExercise };
  }

  getPastExercises() {
    return [...this.exercises];
  }
}
