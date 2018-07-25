import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';


@Component({
  selector: 'stop-training-diag',
  template: `<h2 mat-dialog-title>Are you sure?</h2>

             <mat-dialog-content>
                <p>You already got {{ passedData.progress }}%</p>
             </mat-dialog-content>

             <mat-dialog-actions>
               <button mat-button [mat-dialog-close]="true">Yes</button>
               <button mat-button [mat-dialog-close]="false">No</button>
             </mat-dialog-actions>`
})
export class StopDiagComponent {
  // tell Ng to lookup the data in the currently stored data reference held in constant
  // and store it in the `passed` data property. Allows you to use that prop anywhere.
  constructor(@Inject(MAT_DIALOG_DATA) public passedData: any) {
  }
}
