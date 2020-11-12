import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { JobModel } from '../../../models/presentation-layer/job.model';
import { ContextMenuActionModel } from '../../context-menu/models/context-menu-action.model';

@Component({
  selector: 'app-jobs-table',
  templateUrl: './jobs-table.component.html',
  styleUrls: ['./jobs-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class JobsTableComponent {
  @Input() jobs: JobModel[];
  @Input() actions: ContextMenuActionModel<JobModel>[];

  displayedColumns = ['name', 'status', 'assignedUser', 'actions'];
}
