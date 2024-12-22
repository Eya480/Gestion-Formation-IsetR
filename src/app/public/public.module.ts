import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PublicRoutingModule } from './public-routing.module';
import { NavComponent } from './nav/nav.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { FooterComponent } from './footer/footer.component';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    PublicRoutingModule,
    NavComponent,
    LoginComponent,
    HomeComponent,
    FooterComponent,
    
  ]
})
export class PublicModule { }
