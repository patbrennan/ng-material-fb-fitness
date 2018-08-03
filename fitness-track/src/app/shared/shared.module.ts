import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';

import { MaterialModule } from '../material.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MaterialModule,
    FlexLayoutModule,
  ],
  exports: [ // for use in other modules - will share w/other modules that import this module
    CommonModule,
    FormsModule,
    MaterialModule,
    FlexLayoutModule,
  ]
})
export class SharedModule {}