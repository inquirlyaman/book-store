import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { BookListComponent } from './components';
import { ShareModule } from './../share/share.module';
@NgModule({
  declarations: [BookListComponent],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    ShareModule
  ],

})
export class DashboardModule { }
