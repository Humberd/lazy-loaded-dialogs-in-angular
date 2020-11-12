import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { UserComponent } from './user.component';
import { ViewTitleModule } from '../../shared/view-title/view-title.module';
import { JobsTableModule } from '../../shared/jobs-table/jobs-table.module';


@NgModule({
  declarations: [UserComponent],
  imports: [
    CommonModule,
    UserRoutingModule,
    ViewTitleModule,
    JobsTableModule,
  ],
})
export class UserModule { }
