import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ManageFormationsComponent } from './manage-formations/manage-formations.component';
import { ManageSessionComponent } from './manage-session/manage-session.component';
import { ManageTrainerComponent } from './manage-trainer/manage-trainer.component';
import { ManageCandidateComponent } from './manage-candidate/manage-candidate.component';

const routes: Routes = [
  { path: 'dashboard' , component: DashboardComponent},
  {path : '',redirectTo : 'dashboard',pathMatch : 'full'},
  { path: 'trainings', component: ManageFormationsComponent },
  { path: 'sessions', component: ManageSessionComponent },
  { path: 'trainers', component: ManageTrainerComponent },
  { path: 'candidats', component: ManageCandidateComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
