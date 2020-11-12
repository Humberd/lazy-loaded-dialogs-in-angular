import { JobStatusEnum } from './job-status.enum';

export interface JobDataModel {
  id: string;
  name: string;
  status: JobStatusEnum;
  assignedUserId?: string;
}
