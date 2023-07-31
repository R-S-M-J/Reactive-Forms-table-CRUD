import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TrackerComponent } from '../components/tracker/tracker.component';
import { RoutingModuleRoutingModule } from './routing-module-routing.module';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from '../components/login/login.component';
import { SignupComponent } from '../components/signup/signup.component';
import { AutomobileComponent } from '../components/automobile/automobile.component';

const appRoutes:Routes=[
  {path:'tracker',component:TrackerComponent},
  {path:'automobile',component:AutomobileComponent},
  {path:'login',component:LoginComponent},
  {path:'',component:SignupComponent},
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RoutingModuleRoutingModule,
    RouterModule.forRoot(appRoutes,{ enableTracing:true})
  ]
})
export class RoutingModuleModule { }
