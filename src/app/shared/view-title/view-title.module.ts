import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ViewTitleComponent } from './view-title/view-title.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [ViewTitleComponent],
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    RouterModule,
  ],
  exports: [ViewTitleComponent]
})
export class ViewTitleModule { }
