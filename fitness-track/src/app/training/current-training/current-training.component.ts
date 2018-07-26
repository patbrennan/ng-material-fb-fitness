import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';

import { StopDiagComponent } from './stop-diag.component';
import { TrainingService } from '../training.service';

@Component({
  selector: 'app-current-training',
  templateUrl: './current-training.component.html',
  styleUrls: ['./current-training.component.css']
})
export class CurrentTrainingComponent implements OnInit {
  progress = 0;
  timer: number;

  constructor(private diag: MatDialog,
              private trainingService: TrainingService) { }

  ngOnInit() {
    this.startOrResumeTimer();
  }

  startOrResumeTimer() {
    const step = this.trainingService.currentExercise().duration / 100 * 1000;

    // kick off interval to increase progress
    this.timer = setInterval(() => {
      this.progress += 1;

      if (this.progress >= 100) {
        this.trainingService.completeExercise();
        clearInterval(this.timer);
      }
    }, step);
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
