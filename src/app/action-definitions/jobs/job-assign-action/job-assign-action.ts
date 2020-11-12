import { Injectable } from '@angular/core';
import { ActionDefinition } from '../../action-definition';
import { JobAssignActionParams } from './job-assign-action-params';
import { ActionDefinitionContextMenu } from '../../action-definition-context-menu';
import { JobUserAssignDialogDataModel } from '../../../dialogs/job-user-assign-dialog/models/job-user-assign-dialog-data.model';
import { tap } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';
import { JobUserAssignDialogService } from '../../../dialogs/job-user-assign-dialog/services/job-user-assign-dialog.service';
import { ActionResult } from '../../action-result';

@Injectable({
  providedIn: 'root',
})
export class JobAssignAction extends ActionDefinition<JobAssignActionParams> {
  constructor(
    private snackBar: MatSnackBar,
    private jobUserAssignDialogService: JobUserAssignDialogService,
  ) {
    super();
  }

  async invoke(params: JobAssignActionParams): Promise<ActionResult> {
    const dialogData: JobUserAssignDialogDataModel = {
      jobId: params.jobId,
    };

    const dialogRef = await this.jobUserAssignDialogService.open(dialogData);

    return dialogRef
      .afterClosed()
      .pipe(
        tap(result => {
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
