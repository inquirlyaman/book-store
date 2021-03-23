import { Component, OnInit } from '@angular/core';
import {FormBuilder,FormGroup,Validators} from '@angular/forms';
import {AuthenticationService} from '../../services';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  /*
   * login form 
  */
  loginForm: FormGroup;
  /*
   * to validate the form 
  */
  submitted  = false;
  constructor( private bookStoreFormBuilder: FormBuilder, private authService : AuthenticationService) { }

  ngOnInit() {
    this.intializeFormBuilders();
  }
  private intializeFormBuilders() : void{
    this.loginForm = this.bookStoreFormBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.minLength(6)]]
    })
  }
  get loginFrm() { return this.loginForm.controls;}
  /*
   * submit the form and make api call to validate the credential 
  */
  submit() {
    this.submitted = true;
    if(this.loginForm.invalid){
      return;
    }
    const reqPayload = {
      email : this.loginForm.value.email,
      password: this.loginForm.value.password
    };
    this.authService.login(reqPayload).pipe().subscribe((res:any)=>{

    },err =>{
      console.log(err);
    })
  }
}
