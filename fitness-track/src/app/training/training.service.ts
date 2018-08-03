import { Injectable } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { AngularFirestore } from 'angularfire2/firestore';
import { map } from 'rxjs/operators';

import { Exercise } from './exercise.model';
import { UIService } from '../shared/ui.service';

@Injectable({
  providedIn: 'root'
})
export class TrainingService {
  workoutChanged = new Subject<Exercise>();
  workoutsChanged = new Subject<Exercise[]>();
  finishedExercisesChanged = new Subject<Exercise[]>();
  private workouts: Exercise[] = [];
  private runningExercise: Exercise;
  private fbSubs: Subscription[] = [];

  constructor(private db: AngularFirestore,
              private uiService: UIService) { }

  fetchWorkouts() {
    this.uiService.loadingStateChanged.next(true);
    // valueChanges gives Obs, but only gives us data; no metadata - snapshotChanges gives all
    this.fbSubs.push( this.db.collection('availableWorkouts')
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
      .subscribe((workouts: Exercise[]) => { // can also take second function as arg w/error as arg for error handling
        this.workouts = workouts;
        this.workoutsChanged.next([...this.workouts]); // emit event
        this.uiService.loadingStateChanged.next(false);
      }, error => {
        this.uiService.loadingStateChanged.next(false);
        this.uiService.showSnackbar('Failed to Fetch Exercises. Try again Later', null, 3000);
        this.workoutsChanged.next(null); //
      })
    );
  }

  startExercise(selectedId: string) {
    // just update one document: // TODO: Verify reference document name in firebase
    // this.db.doc(`availableWorkouts/${selectedId}`).update({lastSelected: new Date()});

    this.runningExercise = this.workouts.find(workout => workout.id === selectedId);
    this.workoutChanged.next({...this.runningExercise});
  }

  completeExercise() {
    this.storeToDatabase({
      ...this.runningExercise,
      date: new Date(),
      state: 'completed'
    });
    this.runningExercise = null;
    this.workoutChanged.next(null);
  }

  cancelExercise(progress: number) {
    this.storeToDatabase({
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

  fetchPastExercises() {
    this.fbSubs.push( this.db.collection('finishedExercises')
      .valueChanges() // doesn't give ID; don't need it; returns Obs
      .subscribe((exercises: Exercise[]) => {
        this.finishedExercisesChanged.next(exercises);
      })
    );
  }

  cancelFbSubscriptions() {
    this.fbSubs.forEach(sub => sub.unsubscribe());
  }

  private storeToDatabase(exercise: Exercise) {
    // .add returns a promise where we can catch errors, etc.
    this.db.collection('finishedExercises').add(exercise);
  }
}
