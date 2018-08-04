import {
  TrainingActions,
  SET_AVAILABLE_WORKOUTS,
  SET_FINISHED_WORKOUTS,
  START_TRAINING,
  STOP_TRAINING,
} from './training.actions';
import { createFeatureSelector, createSelector } from '@ngrx/store';

import { Exercise } from './exercise.model';
import * as fromRoot from '../app.reducer';

export interface TrainingState {
  availableWorkouts: Exercise[];
  finishedWorkouts: Exercise[];
  activeWorkout: Exercise;
}

// appState doesn't know about TrainingState because it's lazily loaded, but TrainingState
// knows about appState. When module is loaded lazily, it will merge behind the scenes
export interface State extends fromRoot.State {
  training: TrainingState;
}

const initialState: TrainingState = {
  availableWorkouts: [],
  finishedWorkouts: [],
  activeWorkout: null,
};

export function trainingReducer(state = initialState, action: TrainingActions) {
  switch (action.type) {
    case SET_AVAILABLE_WORKOUTS:
      return {
        ...state,
        availableWorkouts: action.payload,
      };

    case SET_FINISHED_WORKOUTS:
      return {
        ...state,
        finishedWorkouts: action.payload,
      };

    case START_TRAINING:
      return {
        ...state,
        activeWorkout: {...state.availableWorkouts.find(ex => ex.id === action.payload) },
      };

    case STOP_TRAINING:
      return {
        ...state,
        activeWorkout: null,
      };

    default:
      return state;
  }
}


// identifier passed as arg here must match what you pass in training.module.ts
// gives access to entire training slice of state
export const getTrainingState = createFeatureSelector<TrainingState>('training');

export const getAvailableWorkouts = createSelector(getTrainingState,
  (state: TrainingState) => state.availableWorkouts);
export const getFinishedWorkouts = createSelector(getTrainingState,
  (state: TrainingState) => state.finishedWorkouts);
export const getActiveWorkout = createSelector(getTrainingState,
  (state: TrainingState) => state.activeWorkout);
export const workoutInProgress = createSelector(getTrainingState,
  (state: TrainingState) => state.activeWorkout != null);
