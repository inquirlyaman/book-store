import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { BookListComponent, BookModalComponent } from './components';
import { ShareModule } from './../share/share.module';
import { ModalModule } from 'ngx-bootstrap/modal';
import { BookService } from './services';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    DashboardRoutingModule,
    ShareModule,
    ModalModule.forChild()
  ],
  declarations: [BookListComponent, BookModalComponent],
  entryComponents: [BookModalComponent],
  providers: [BookService]
})
export class DashboardModule { }
