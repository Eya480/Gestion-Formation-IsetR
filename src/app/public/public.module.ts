import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PublicRoutingModule } from './public-routing.module';
import { NavComponent } from './nav/nav.component';
import { HomeComponent } from './home/home.component';
import { FooterComponent } from './footer/footer.component';
import { RegisterComponent } from './register/register.component';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    PublicRoutingModule,
    NavComponent,
    HomeComponent,
    FooterComponent,
    RegisterComponent
    
  ]
})
export class PublicModule { }
