import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './core/about/about.component';
import { CalculatorComponent } from './core/calculator/calculator.component';
import { ContactusComponent } from './core/contactus/contactus.component';
import { HomeComponent } from './core/home/home.component';
import { InitiativesComponent } from './core/initiatives/initiatives.component';
import { TakeActionComponent } from './core/take-action/take-action.component';
import { VolunteerComponent } from './core/volunteer/volunteer.component';

const routes: Routes = [
  { path:'',component: HomeComponent },
  { path:'about',component: AboutComponent },
  { path:'initiatives',component: InitiativesComponent },
  { path:'contactus',component: ContactusComponent },
  { path:'calculator',component: CalculatorComponent },
  { path:'take-action',component: TakeActionComponent },
  { path:'take-action/volunteer',component: VolunteerComponent },
  { path:'initiatives/take-action',component: TakeActionComponent },
  { path:'initiatives/take-action/volunteer',component: VolunteerComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
