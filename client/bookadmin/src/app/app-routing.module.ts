import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './modules/auth/guard/authguard.service';;
export const routes: Routes = [

  { path: '', loadChildren: './modules/auth/auth.module#AuthModule' },
  {
    path: 'dashboard', loadChildren: './modules/dashboard/dashboard.module#DashboardModule',
    canActivate: [AuthGuard]
  }
];


@NgModule({
  imports: [RouterModule.forRoot(routes),
    CommonModule],
  exports: [RouterModule]
})
export class AppRoutingModule { }
