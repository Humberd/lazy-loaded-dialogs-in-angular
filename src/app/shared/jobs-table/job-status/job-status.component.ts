import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { JobStatusEnum } from '../../../models/data-layer/job-status.enum';

@Component({
  selector: 'app-job-status',
  templateUrl: './job-status.component.html',
  styleUrls: ['./job-status.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class JobStatusComponent{
  @Input() status: JobStatusEnum;

  JobStatusEnum = JobStatusEnum;
}
