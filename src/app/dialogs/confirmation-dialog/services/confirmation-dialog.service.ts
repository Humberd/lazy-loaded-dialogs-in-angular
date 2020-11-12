import { Injectable } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { ConfirmationDialogDataModel } from '../models/confirmation-dialog-data.model';
import { ConfirmationDialogComponent } from '../confirmation-dialog.component';
import { Observable } from 'rxjs';
import { AsyncDialog } from '../../async-dialog';
import { fromPromise } from 'rxjs/internal-compatibility';
import { switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ConfirmationDialogService extends AsyncDialog<ConfirmationDialogComponent, ConfirmationDialogDataModel, boolean> {
  async open(data: ConfirmationDialogDataModel): Promise<MatDialogRef<ConfirmationDialogComponent, boolean>> {
    const {ConfirmationDialogModule} = await import('../confirmation-dialog.module');

    return this.matDialog.open(ConfirmationDialogModule.getComponent(), {data});
  }

  open$(data: ConfirmationDialogDataModel): Observable<boolean> {
    return fromPromise(this.open(data))
      .pipe(
        switchMap(dialogRef => dialogRef.afterClosed()),
      );
  }
}
