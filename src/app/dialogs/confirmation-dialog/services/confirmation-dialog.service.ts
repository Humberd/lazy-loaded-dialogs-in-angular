import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationDialogDataModel } from '../models/confirmation-dialog-data.model';
import { ConfirmationDialogComponent } from '../confirmation-dialog.component';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ConfirmationDialogService {

  constructor(private matDialog: MatDialog) {
  }

  open(data: ConfirmationDialogDataModel): Observable<boolean> {
    return this.matDialog.open(ConfirmationDialogComponent, {
      data,
    })
      .afterClosed();
  }

}
