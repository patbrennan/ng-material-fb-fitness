import { Action } from '@ngrx/store';
import { Exercise } from './exercise.model';

export const SET_AVAILABLE_WORKOUTS = '[Training] Set Available Workouts';
export const SET_FINISHED_WORKOUTS = '[Training] Set Finished Workouts';
export const START_TRAINING = '[Training] Start Active Workout';
export const STOP_TRAINING = '[Training] Stop Active Workout';

export class SetAvailableWorkouts implements Action {
  readonly type = SET_AVAILABLE_WORKOUTS;

  constructor(public payload: Exercise[]) {}
}

export class SetFinishedWorkouts implements Action {
  readonly type = SET_FINISHED_WORKOUTS;

  constructor(public payload: Exercise[]) {}
}

export class StartTraining implements Action {
  readonly type = START_TRAINING;

  constructor(public payload: string) {}
}

export class StopTraining implements Action {
  readonly type = STOP_TRAINING;
}

export type TrainingActions =
  SetAvailableWorkouts |
  SetFinishedWorkouts |
  StartTraining |
  StopTraining;
