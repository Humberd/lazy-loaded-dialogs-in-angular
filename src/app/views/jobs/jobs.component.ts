import { ChangeDetectionStrategy, Component, Injector } from '@angular/core';
import { JobsService } from '../../services/jobs.service';
import { ContextMenuActionModel } from '../../shared/context-menu/models/context-menu-action.model';
import { JobModel } from '../../models/presentation-layer/job.model';
import { JobAssignAction } from '../../action-definitions/jobs/job-assign-action/job-assign-action';
import { JobCompleteAction } from '../../action-definitions/jobs/job-complete-action/job-complete-action';
import { JobUnassignAction } from '../../action-definitions/jobs/job-unassign-action/job-unassign-action';
import { JobStartAction } from '../../action-definitions/jobs/job-start-action/job-start-action';
import { JobRestartAction } from '../../action-definitions/jobs/job-restart-action/job-restart-action';
import { JobStatusEnum } from '../../models/data-layer/job-status.enum';

@Component({
  selector: 'app-jobs',
  templateUrl: './jobs.component.html',
  styleUrls: ['./jobs.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class JobsComponent {
  jobs$ = this.jobsService.readList$();
  actions: ContextMenuActionModel<JobModel>[];

  constructor(
    private jobsService: JobsService,
    private injector: Injector,
  ) {
    this.actions = this.buildActions();
  }

  private buildActions(): ContextMenuActionModel<JobModel>[] {
    return [
      this.injector.get(JobAssignAction).build({
        resolveParams: actor => ({jobId: actor.id}),
        isHidden: actor => !!actor.assignedUser,
        onSuccess: () => this.jobsService.reloadData()
      }),
      this.injector.get(JobUnassignAction).build({
        resolveParams: actor => ({jobId: actor.id, currentUserName: actor.assignedUser.name}),
        isHidden: actor => !actor.assignedUser
      }),
      this.injector.get(JobStartAction).build({
        resolveParams: actor => ({jobId: actor.id}),
        isHidden: actor => actor.status !== JobStatusEnum.NEW
      }),
      this.injector.get(JobCompleteAction).build({
        resolveParams: actor => ({jobId: actor.id}),
        isHidden: actor => actor.status !== JobStatusEnum.IN_PROGRESS
      }),
      this.injector.get(JobRestartAction).build({
        resolveParams: actor => ({jobId: actor.id}),
        isHidden: actor => actor.status !== JobStatusEnum.DONE
      })
    ];
  }

}
