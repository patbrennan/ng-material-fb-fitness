import { Subject } from 'rxjs';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '../../../node_modules/@angular/material';

@Injectable()
export class UIService {
  loadingStateChanged = new Subject<boolean>();

  constructor(private snackbar: MatSnackBar) {}

  showSnackbar(message, action, duration) { // made reusable
    this.snackbar.open(message, action, {
      duration: duration
    });
  }
}
