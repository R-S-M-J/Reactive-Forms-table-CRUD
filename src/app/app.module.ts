import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule, FormsModule, FormArray } from '@angular/forms';
import { AutomobileComponent } from './components/automobile/automobile.component';
import { TrackerComponent } from './components/tracker/tracker.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';

const appRoutes:Routes=[
  {path:'tracker',component:TrackerComponent},
  {path:'automobile',component:AutomobileComponent},
  {path:'login',component:LoginComponent},
  {path:'',component:SignupComponent},
]

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    AutomobileComponent,
    TrackerComponent,
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes,{ enableTracing:true}),
    ReactiveFormsModule,
    HttpClientModule, 
    FormsModule, FontAwesomeModule, BrowserAnimationsModule,
    MatToolbarModule,MatButtonModule,MatIconModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
