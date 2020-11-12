import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule } from '@angular/material/dialog';
import { JobUserAssignDialogModule } from './dialogs/job-user-assign-dialog/job-user-assign-dialog.module';
import { ConfirmationDialogModule } from './dialogs/confirmation-dialog/confirmation-dialog.module';
import { MAT_SNACK_BAR_DEFAULT_OPTIONS, MatSnackBarModule } from '@angular/material/snack-bar';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatDialogModule,
    MatSnackBarModule,
    JobUserAssignDialogModule,
    ConfirmationDialogModule
  ],
  providers: [
    {provide: MAT_SNACK_BAR_DEFAULT_OPTIONS, useValue: {duration: 5000, horizontalPosition: 'center', verticalPosition: 'top'}}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
