import { NgModule } from '@angular/core';
import { RouterModule, Routes,Router } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { TrainingsComponent } from './trainings/trainings.component';
import { TrainingDetailsComponent } from './training-details/training-details.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { RegisterSessionComponent } from './register-session/register-session.component';

const routes: Routes = [
  { path: 'home' , component: HomeComponent},
  {path : '',redirectTo : 'home',pathMatch : 'full'},
  { path: 'trainings', component: TrainingsComponent },
  { path: 'registerSession/:id', component: RegisterSessionComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  {path:'trainingDetails/:id', component: TrainingDetailsComponent},
  {path:'trainingDetails', component: TrainingDetailsComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PublicRoutingModule { }
