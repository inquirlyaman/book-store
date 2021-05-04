import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BookListComponent } from './components';
import { AuthGuard } from '../../modules/auth/guard/authguard.service';;
const routes: Routes = [
  { path: 'books', component: BookListComponent, canLoad: [AuthGuard] },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
