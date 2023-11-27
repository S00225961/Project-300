import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ElectricityTrackerComponent } from './electricity-tracker/electricity-tracker.component';
import { CommuteTrackerComponent } from './commute-tracker/commute-tracker.component';
import { AppComponent } from './app.component';

const routes: Routes = [
  {path: '', component: AppComponent},
  {path: '/electricity', component: ElectricityTrackerComponent},
  {path: '/commute', component: CommuteTrackerComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
