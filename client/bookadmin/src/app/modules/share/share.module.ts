import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainMenuComponent, FooterComponent } from './components';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [MainMenuComponent, FooterComponent],
  exports: [MainMenuComponent, FooterComponent]
})
export class ShareModule { }
