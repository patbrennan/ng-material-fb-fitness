import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { TrainingService } from './training.service';

@Component({
  selector: 'app-training',
  templateUrl: './training.component.html',
  styleUrls: ['./training.component.css']
})
export class TrainingComponent implements OnInit, OnDestroy {
  workoutInProgress = false;
  workoutSubscription: Subscription;

  constructor(private trainingService: TrainingService) { }

  ngOnInit() {
    this.workoutSubscription = this.trainingService.workoutChanged.subscribe(
      workout => {
        this.workoutInProgress = !!workout;
      }
    );
  }

  ngOnDestroy() {
    if (this.workoutSubscription) {
      this.workoutSubscription.unsubscribe();
    }
  }
}
