import { Injectable } from '@angular/core';
import { ActionDefinition } from '../../action-definition';
import { JobCompleteActionParams } from './job-complete-action-params';
import { ActionDefinitionContextMenu } from '../../action-definition-context-menu';
import { Observable } from 'rxjs';
import { JobsService } from '../../../services/jobs.service';
import { JobStatusEnum } from '../../../models/data-layer/job-status.enum';
import { MatSnackBar } from '@angular/material/snack-bar';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class JobCompleteAction extends ActionDefinition<JobCompleteActionParams> {
  constructor(
    private jobsService: JobsService,
    private snackBar: MatSnackBar,
  ) {
    super();
  }

  invoke(params: JobCompleteActionParams): any | Observable<any> {
    return this.jobsService.setStatus(params.jobId, JobStatusEnum.DONE)
      .pipe(
        tap(() => this.snackBar.open(`Job successfully completed. You deserve a prize.`))
      );
  }

  protected getMenu(): ActionDefinitionContextMenu {
    return {
      name: 'Complete',
      icon: 'done',
    };
  }

}
