import { Injectable } from '@angular/core';
import { ActionDefinition } from '../../action-definition';
import { JobStartActionParams } from './job-start-action-params';
import { ActionDefinitionContextMenu } from '../../action-definition-context-menu';
import { Observable } from 'rxjs';
import { JobStatusEnum } from '../../../models/data-layer/job-status.enum';
import { JobsService } from '../../../services/jobs.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class JobStartAction extends ActionDefinition<JobStartActionParams> {
  constructor(
    private jobsService: JobsService,
    private snackBar: MatSnackBar,
  ) {
    super();
  }

  invoke(params: JobStartActionParams): any | Observable<any> {
    return this.jobsService.setStatus(params.jobId, JobStatusEnum.IN_PROGRESS)
      .pipe(
        tap(() => this.snackBar.open(`Nice, you started a job. Keep working`))
      );
  }

  protected getMenu(): ActionDefinitionContextMenu {
    return {
      name: 'Start',
      icon: 'play_arrow',
    };
  }

}
