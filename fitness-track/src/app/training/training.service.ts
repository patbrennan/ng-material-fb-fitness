import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import { Exercise } from './exercise.model';

@Injectable({
  providedIn: 'root'
})
export class TrainingService {
  workoutChanged = new Subject<Exercise>();
  private workouts: Exercise[] = [
    { id: 'crunches', name: 'Crunches', duration: 30, calories: 8 },
    { id: 'jump-rope', name: 'Jump Rope', duration: 180, calories: 25 },
    { id: 'side-lunges', name: 'Side Lunges', duration: 120, calories: 15 },
    { id: 'burpees', name: 'Burpees', duration: 60, calories: 30 },
  ];
  private runningExercise: Exercise;
  private exercises: Exercise[] = [];

  constructor() { }

  getWorkouts() {
    return [...this.workouts];
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
