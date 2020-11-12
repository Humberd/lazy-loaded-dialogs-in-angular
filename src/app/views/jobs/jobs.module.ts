import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { JobsRoutingModule } from './jobs-routing.module';
import { JobsComponent } from './jobs.component';
import { JobsTableModule } from '../../shared/jobs-table/jobs-table.module';
import { ViewTitleModule } from '../../shared/view-title/view-title.module';


@NgModule({
  declarations: [JobsComponent],
  imports: [
    CommonModule,
    JobsRoutingModule,
    JobsTableModule,
    ViewTitleModule,
  ],
})
export class JobsModule { }
