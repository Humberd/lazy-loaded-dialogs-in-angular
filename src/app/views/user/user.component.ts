import { ChangeDetectionStrategy, Component, Injector, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UsersService } from '../../services/users.service';
import { JobsService } from '../../services/jobs.service';
import { BehaviorSubject } from 'rxjs';
import { UserModel } from '../../models/presentation-layer/user.model';
import { filter, map, switchMap } from 'rxjs/operators';
import { ContextMenuActionModel } from '../../shared/context-menu/models/context-menu-action.model';
import { JobModel } from '../../models/presentation-layer/job.model';
import { JobStartAction } from '../../action-definitions/jobs/job-start-action/job-start-action';
import { JobStatusEnum } from '../../models/data-layer/job-status.enum';
import { JobCompleteAction } from '../../action-definitions/jobs/job-complete-action/job-complete-action';
import { JobRestartAction } from '../../action-definitions/jobs/job-restart-action/job-restart-action';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserComponent implements OnInit {
  currentUser$ = new BehaviorSubject<UserModel>(undefined);
  jobs$ = this.currentUser$
    .pipe(
      switchMap(user =>
        this.jobsService.readList$()
          .pipe(
            map(jobs => jobs.filter(job => job.assignedUser?.id === user.id)),
          ),
      ),
    );
  actions: ContextMenuActionModel<JobModel>[];

  constructor(
    private activatedRoute: ActivatedRoute,
    private usersService: UsersService,
    private jobsService: JobsService,
    private injector: Injector
  ) {
    this.actions = this.buildActions();
  }

  ngOnInit(): void {
    this.activatedRoute.params
      .pipe(
        map(params => params.id),
        filter(userId => userId),
        map(userId => this.usersService.read(userId)),
      )
      .subscribe(user => this.currentUser$.next(user));
  }

  private buildActions(): ContextMenuActionModel<JobModel>[] {
    return [
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
