import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ModalModule } from 'ngx-bootstrap/modal';
import { AppRoutingModule } from './app-routing.module';
import { AuthModule } from './modules/auth';
import { CoreModule } from './modules/core';
import { CookieModule } from 'ngx-cookie';
import { ShareModule } from './modules/share';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    ModalModule.forRoot(),
    AuthModule,
    CookieModule.forChild(),
    CoreModule,
    ShareModule,
    AppRoutingModule,

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
