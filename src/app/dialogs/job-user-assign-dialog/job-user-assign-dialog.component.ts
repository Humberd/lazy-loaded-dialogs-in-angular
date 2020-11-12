import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Inject, OnInit } from '@angular/core';
import { UsersService } from '../../services/users.service';
import { JobsService } from '../../services/jobs.service';
import { FormControl, FormGroup } from '@angular/forms';
import { take } from 'rxjs/operators';
import { UserModel } from '../../models/presentation-layer/user.model';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { JobUserAssignDialogDataModel } from './models/job-user-assign-dialog-data.model';

@Component({
  selector: 'app-job-user-assign-dialog',
  templateUrl: './job-user-assign-dialog.component.html',
  styleUrls: ['./job-user-assign-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class JobUserAssignDialogComponent implements OnInit {
  formGroup = new FormGroup({
    userId: new FormControl(),
  });

  availableUsers: UserModel[];

  constructor(
    private usersService: UsersService,
    private jobsService: JobsService,
    private changeDetectorRef: ChangeDetectorRef,
    @Inject(MAT_DIALOG_DATA) private dialogData: JobUserAssignDialogDataModel,
    private dialogRef: MatDialogRef<JobUserAssignDialogComponent>
  ) {
  }

  ngOnInit(): void {
    this.usersService.readList$()
      .pipe(
        take(1),
      )
      .subscribe(availableUsers => {
        this.availableUsers = availableUsers;
        this.formGroup.get('userId').setValue(availableUsers[0].id);
        this.changeDetectorRef.markForCheck();
      });
  }

  submit(): void {
    this.jobsService.setUser(this.dialogData.jobId, this.formGroup.value.userId)
      .subscribe(() => {
        this.dialogRef.close(this.availableUsers.find(user => user.id === this.formGroup.value.userId));
      });
  }

}
