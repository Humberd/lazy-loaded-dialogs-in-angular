import { Injectable } from '@angular/core';
import { ActionDefinition } from '../../action-definition';
import { JobUnassignActionParams } from './job-unassign-action-params';
import { ActionDefinitionContextMenu } from '../../action-definition-context-menu';
import { JobsService } from '../../../services/jobs.service';
import { Observable } from 'rxjs';
import { ConfirmationDialogService } from '../../../dialogs/confirmation-dialog/services/confirmation-dialog.service';
import { filter, switchMap, tap } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class JobUnassignAction extends ActionDefinition<JobUnassignActionParams> {
  constructor(
    private jobsService: JobsService,
    private confirmationDialogService: ConfirmationDialogService,
    private snackBar: MatSnackBar,
  ) {
    super();
  }

  invoke(params: JobUnassignActionParams): any | Observable<any> {
    return this.confirmationDialogService
      .open({
        title: `Unassign ${params.currentUserName}?`,
        content: `You are going to unassign ${params.currentUserName} from this Job, are you completely sure?`,
      })
      .pipe(
        filter(Boolean),
        switchMap(() => this.confirmationDialogService.open({
          title: 'Are you 100% sure?',
          content: 'There is no way back!',
          cancelButtonText: 'Take me back',
          confirmButtonText: 'YES!'
        })),
        filter(Boolean),
        switchMap(() => this.jobsService.setUser(params.jobId, undefined)),
        tap(() => this.snackBar.open('User unassigned successfully'))
      );
  }

  protected getMenu(): ActionDefinitionContextMenu {
    return {
      name: 'Unassign from User',
      icon: 'voice_over_off',
    };
  }

}
