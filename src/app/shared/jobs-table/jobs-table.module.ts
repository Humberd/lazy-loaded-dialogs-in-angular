import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JobsTableComponent } from './jobs-table/jobs-table.component';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { ContextMenuModule } from '../context-menu/context-menu.module';
import { RouterModule } from '@angular/router';
import { JobStatusComponent } from './job-status/job-status.component';

@NgModule({
  declarations: [JobsTableComponent, JobStatusComponent],
  imports: [
    CommonModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    ContextMenuModule,
    RouterModule,
  ],
  exports: [JobsTableComponent]
})
export class JobsTableModule { }
