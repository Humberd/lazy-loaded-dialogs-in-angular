import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'jobs',
  },
  {
    path: 'jobs', loadChildren: () => import('./views/jobs/jobs.module').then(m => m.JobsModule),
  },
  {
    path: 'users/:id', loadChildren: () => import('./views/user/user.module').then(m => m.UserModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {
}
