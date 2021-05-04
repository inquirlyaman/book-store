import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent, SignupComponent } from './components';
import { AuthenticationService } from './services';
import { HttpClientModule } from '@angular/common/http';
import { AuthGuard } from '../auth/guard/authguard.service';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AuthRoutingModule,
    HttpClientModule
  ],
  declarations: [LoginComponent, SignupComponent],
  exports: [LoginComponent],
  providers: [AuthGuard, AuthenticationService]
})
export class AuthModule { }
