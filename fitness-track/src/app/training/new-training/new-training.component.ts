import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.css']
})
export class NewTrainingComponent implements OnInit {
  workouts: string[] = ['Crunches', 'Burpees', 'Leg Lifts', 'Jump Rope'];
  trainingInProgress = false;
  @Output() trainingStarted = new EventEmitter<void>();

  constructor() { }

  ngOnInit() {
  }

  startTraining() {
    this.trainingStarted.emit();
  }

}
