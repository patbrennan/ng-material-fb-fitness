import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { Store } from '@ngrx/store';
import { take } from 'rxjs/operators';

import { StopDiagComponent } from './stop-diag.component';
import { TrainingService } from '../training.service';
import * as fromTraining from '../training.reducer';
import { Exercise } from '../exercise.model';

@Component({
  selector: 'app-current-training',
  templateUrl: './current-training.component.html',
  styleUrls: ['./current-training.component.css']
})
export class CurrentTrainingComponent implements OnInit {
  progress = 0;
  timer: number;

  constructor(private diag: MatDialog,
              private trainingService: TrainingService,
              private store: Store<fromTraining.State>) { }

  ngOnInit() {
    this.startOrResumeTimer();
  }

  startOrResumeTimer() {
    this.store.select(fromTraining.getActiveWorkout)
    .pipe(take(1))
    .subscribe(
      (workout: Exercise) => {
        const step = workout.duration / 100 * 1000;

        // kick off interval to increase progress
        this.timer = setInterval(() => {
          this.progress += 1;

          if (this.progress >= 100) {
            this.trainingService.completeExercise();
            clearInterval(this.timer);
          }
        }, step);
      }
    );
  }

  stopTimer() {
    clearInterval(this.timer);

    const dialogRef = this.diag.open(StopDiagComponent, { // returns ref to open dialog box
      data: {
      progress: this.progress
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.trainingService.cancelExercise(this.progress);
      } else {
        this.startOrResumeTimer();
      }
    });
  }

}
