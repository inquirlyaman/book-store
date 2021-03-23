import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LoginComponent,SignupComponent} from './components';
const routes: Routes = [
  {path :'', redirectTo: 'login', pathMatch: 'full'},
  {path :'login', component: LoginComponent},
  {path :'signup', component: SignupComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
