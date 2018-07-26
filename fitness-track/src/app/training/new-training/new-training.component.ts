import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { TrainingService } from '../training.service';
import { Exercise } from '../exercise.model';

@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.css']
})
export class NewTrainingComponent implements OnInit {
  workouts: Exercise[] = [];
  trainingInProgress = false;

  constructor(private trainingService: TrainingService) { }

  ngOnInit() {
    this.workouts = this.trainingService.getWorkouts();
  }

  startTraining(form: NgForm) {
    console.log(form);
    this.trainingService.startExercise(form.value.workout);
  }

}
