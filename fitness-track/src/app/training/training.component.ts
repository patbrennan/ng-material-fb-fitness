import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { TrainingService } from './training.service';

@Component({
  selector: 'app-training',
  templateUrl: './training.component.html',
  styleUrls: ['./training.component.css']
})
export class TrainingComponent implements OnInit {
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

}
