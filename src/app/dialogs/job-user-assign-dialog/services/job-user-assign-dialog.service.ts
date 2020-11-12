import { Injectable } from '@angular/core';
import { JobUserAssignDialogComponent } from '../job-user-assign-dialog.component';
import { JobUserAssignDialogDataModel } from '../models/job-user-assign-dialog-data.model';
import { AsyncDialog } from '../../async-dialog';
import { MatDialogRef } from '@angular/material/dialog';
import { UserModel } from '../../../models/presentation-layer/user.model';

@Injectable({providedIn: 'root'})
export class JobUserAssignDialogService extends AsyncDialog<JobUserAssignDialogComponent, JobUserAssignDialogDataModel, UserModel> {

  async open(data: JobUserAssignDialogDataModel): Promise<MatDialogRef<JobUserAssignDialogComponent, UserModel>> {
    const {JobUserAssignDialogModule} = await import('../job-user-assign-dialog.module');

    return this.matDialog.open(JobUserAssignDialogModule.getComponent(), {data},);
  }
}
