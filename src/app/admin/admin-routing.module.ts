import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ManageCandidateComponent } from './manage-candidate/manage-candidate.component';
import { ManageTrainerComponent } from './manage-trainer/manage-trainer.component';
import { ManageSessionComponent } from './manage-session/manage-session.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
  },
  {
    path: 'candidate',
    component: ManageCandidateComponent,
  },
  {
    path: 'trainer',
    component: ManageTrainerComponent,
  },
  {
    path: 'courses',
    component: ManageTrainerComponent,
  },
  {
    path: 'sessions',
    component: ManageSessionComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
