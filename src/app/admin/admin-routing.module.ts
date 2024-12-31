import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ListCandidatComponent } from './manage-candidats/list-candidat/list-candidat.component';
import { ListSessionsComponent } from './manage-sessions/list-sessions/list-sessions.component';
import { ListTrainersComponent } from './manage-trainers/list-trainers/list-trainers.component';
import { AddCandidatComponent } from './manage-candidats/add-candidat/add-candidat.component';
import { EditCandidatComponent } from './manage-candidats/edit-candidat/edit-candidat.component';
import { AddTrainersComponent } from './manage-trainers/add-trainers/add-trainers.component';
import { EditTrainersComponent } from './manage-trainers/edit-trainers/edit-trainers.component';
import { AddTrainingsComponent } from './manage-trainings/add-trainings/add-trainings.component';
import { EditTrainingsComponent } from './manage-trainings/edit-trainings/edit-trainings.component';
import { ListTrainingsComponent } from './manage-trainings/list-trainings/list-trainings.component';

const routes: Routes = [
  { path: 'dashboard' , component: DashboardComponent},
  {path : '',redirectTo : 'dashboard',pathMatch : 'full'},
  //training
  { path: 'trainings', component: ListTrainingsComponent },
  { path: 'addTraining', component: AddTrainingsComponent },
  { path: 'editTraining/:id', component: EditTrainingsComponent},
  //session
  { path: 'sessions', component: ListSessionsComponent },
  //trainers
  { path: 'trainers', component: ListTrainersComponent },
  { path: 'addTrainer', component: AddTrainersComponent },
  { path: 'editTrainer/:id', component: EditTrainersComponent},
  //candidat
  { path: 'candidats', component: ListCandidatComponent },
  { path: 'addCandidat', component: AddCandidatComponent },
  { path: 'editCandidat/:id', component: EditCandidatComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
