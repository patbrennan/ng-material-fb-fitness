import { Injectable } from '@angular/core';
import { Subscription } from 'rxjs';
import { AngularFirestore } from 'angularfire2/firestore';
import { map, take } from 'rxjs/operators';
import { Store } from '@ngrx/store';

import { Exercise } from './exercise.model';
import { UIService } from '../shared/ui.service';
import * as fromTraining from './training.reducer';
import * as UI from '../shared/ui.actions';
import * as Training from './training.actions';

@Injectable({
  providedIn: 'root'
})
export class TrainingService {
  // workoutChanged = new Subject<Exercise>();
  // workoutsChanged = new Subject<Exercise[]>();
  // finishedExercisesChanged = new Subject<Exercise[]>();
  // private workouts: Exercise[] = [];
  // private runningExercise: Exercise;
  private fbSubs: Subscription[] = [];

  constructor(private db: AngularFirestore,
              private uiService: UIService,
              // NOTE: switched to fromTraining; lazy-loaded not available, but global
              // state is available since we extend it in the training.reducer file
              private store: Store<fromTraining.State>) { }

  fetchWorkouts() {
    // this.uiService.loadingStateChanged.next(true);
    this.store.dispatch(new UI.StartLoading());

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
      // can also take second function as arg w/error as arg for error handling
      .subscribe((workouts: Exercise[]) => {
        // this.uiService.loadingStateChanged.next(false);
        this.store.dispatch(new UI.StopLoading());
        this.store.dispatch(new Training.SetAvailableWorkouts(workouts));
        // this.workouts = workouts;
        // this.workoutsChanged.next([...this.workouts]); // emit event
      },
      error => {
        // this.uiService.loadingStateChanged.next(false);
        this.store.dispatch(new UI.StopLoading());
        this.uiService.showSnackbar('Failed to Fetch Exercises. Try again Later', null, 3000);
        // this.workoutsChanged.next(null);
      })
    );
  }

  startExercise(selectedId: string) {
    // just update one document: // TODO: Verify reference document name in firebase
    // this.db.doc(`availableWorkouts/${selectedId}`).update({lastSelected: new Date()});

    this.store.dispatch(new Training.StartTraining(selectedId));
    // this.runningExercise = this.workouts.find(workout => workout.id === selectedId);
    // this.workoutChanged.next({...this.runningExercise});
  }

  completeExercise() {
    this.store.select(fromTraining.getActiveWorkout)
    .pipe(take(1))
    .subscribe(
      workout => {
        this.storeToDatabase({
          ...workout,
          date: new Date(),
          state: 'completed'
        });
        this.store.dispatch(new Training.StopTraining());
        // this.runningExercise = null;
        // this.workoutChanged.next(null);
      }
    );
  }

  cancelExercise(progress: number) {
    this.store.select(fromTraining.getActiveWorkout)
    .pipe(take(1)) // necessary so we don't execute code below every time there's a change
    .subscribe(
      workout => {
        this.storeToDatabase({
          ...workout,
          duration: workout.duration * (progress / 100),
          calories: workout.calories * (progress / 100),
          date: new Date(),
          state: 'cancelled'
        });
        this.store.dispatch(new Training.StopTraining());
        // this.runningExercise = null;
        // this.workoutChanged.next(null);
      }
    );
  }

  // currentExercise() {
  //   return { ...this.runningExercise };
  // }

  fetchPastExercises() {
    this.fbSubs.push( this.db.collection('finishedExercises')
      .valueChanges() // doesn't give ID; don't need it; returns Obs
      .subscribe((exercises: Exercise[]) => {
        this.store.dispatch(new Training.SetFinishedWorkouts(exercises));
        // this.finishedExercisesChanged.next(exercises);
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
