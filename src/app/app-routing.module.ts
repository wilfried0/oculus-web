import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { OculusDetailsComponent } from './oculus-details/oculus-details.component';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'incident/details/:id', component: OculusDetailsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
