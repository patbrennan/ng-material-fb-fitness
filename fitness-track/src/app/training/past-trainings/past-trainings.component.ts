import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';
// import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';

import { Exercise } from '../exercise.model';
import { TrainingService } from '../training.service';
import * as fromTraining from '../training.reducer';

@Component({
  selector: 'app-past-trainings',
  templateUrl: './past-trainings.component.html',
  styleUrls: ['./past-trainings.component.css']
})
export class PastTrainingsComponent implements OnInit, AfterViewInit {
  // names in this array must match names in html template assigned to matColumnDef
  // also defines the order
  displayedColumns = ['date', 'name', 'duration', 'calories', 'state'];
  // this type always automatically assumes array of type you specify in generic syntax
  dataSource = new MatTableDataSource<Exercise>();
  // private finishedExSubscription = new Subscription;

  // ViewChild needed w/MatSort to give access to template element here
  @ViewChild(MatSort) sort: MatSort;
  // could also use local ref from template in ViewChild
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private trainingService: TrainingService,
              private store: Store<fromTraining.State>) { }

  ngOnInit() {
    this.store.select(fromTraining.getFinishedWorkouts)
    .subscribe((exercises: Exercise[]) => {
      this.dataSource.data = exercises;
    });
    this.trainingService.fetchPastExercises();
  }

  // needed for sorting table; dataSource.sort not rendered since sort fetched from template
  // ng connects the data behind the scenes
  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  // ngOnDestroy() {
  //   if (this.finishedExSubscription) {
  //     this.finishedExSubscription.unsubscribe();
  //   }
  // }

  filter(text: string) {
    // material table concats all values of row & searches for text as lowercase
    this.dataSource.filter = text.trim().toLowerCase();
  }

}
