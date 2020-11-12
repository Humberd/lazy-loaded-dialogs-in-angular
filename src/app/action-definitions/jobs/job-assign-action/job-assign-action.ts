import { Injectable } from '@angular/core';
import { ActionDefinition } from '../../action-definition';
import { JobAssignActionParams } from './job-assign-action-params';
import { ActionDefinitionContextMenu } from '../../action-definition-context-menu';
import { Observable } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { JobUserAssignDialogComponent } from '../../../dialogs/job-user-assign-dialog/job-user-assign-dialog.component';
import { JobUserAssignDialogDataModel } from '../../../dialogs/job-user-assign-dialog/models/job-user-assign-dialog-data.model';
import { tap } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserModel } from '../../../models/presentation-layer/user.model';

@Injectable({
  providedIn: 'root',
})
export class JobAssignAction extends ActionDefinition<JobAssignActionParams> {
  constructor(
    private dialogService: MatDialog,
    private snackBar: MatSnackBar,
  ) {
    super();
  }

  invoke(params: JobAssignActionParams): any | Observable<any> {
    const dialogData: JobUserAssignDialogDataModel = {
      jobId: params.jobId,
    };

    return this.dialogService
      .open(JobUserAssignDialogComponent, {
        data: dialogData,
      })
      .afterClosed()
      .pipe(
        tap((result: UserModel) => {
          if (result) {
            this.snackBar.open(`${result.name} was successfully assigned to the Job`);
          }
        }),
      );
  }

  protected getMenu(): ActionDefinitionContextMenu {
    return {
      name: 'Assign to User',
      icon: 'how_to_reg',
    };
  }

}
