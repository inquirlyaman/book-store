import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../../auth/services';

@Component({
  selector: 'app-main-menu',
  templateUrl: './main-menu.component.html',
  styleUrls: ['./main-menu.component.css']
})
export class MainMenuComponent implements OnInit {

  constructor(public authenticationService: AuthenticationService) { }

  ngOnInit() {
  }

}
