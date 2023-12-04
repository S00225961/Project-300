import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component'; 
import { ElectricityTrackerComponent } from './electricity-tracker/electricity-tracker.component';
import { CommuteTrackerComponent } from './commute-tracker/commute-tracker.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent }, 
  { path: 'electricity', component: ElectricityTrackerComponent },
  { path: 'commute', component: CommuteTrackerComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' }, 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
