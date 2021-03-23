import { Component, OnInit ,OnDestroy } from '@angular/core';
import {FormBuilder,FormGroup,Validators} from '@angular/forms';
import {Router} from '@angular/router'
import {AuthenticationService} from '../../services';
import {Subject} from 'rxjs';
import { takeUntil } from 'rxjs/operators';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit ,OnDestroy {
  /*
   * login form 
  */
  loginForm: FormGroup;
  /*
   * to validate the form 
  */
  submitted  = false;
  /*
   * to unsubscribe the observable
  */
  public unsubscribe = new Subject<void>();
  constructor( private bookStoreFormBuilder: FormBuilder,
     private authService : AuthenticationService, private router: Router) { }

  ngOnInit() {
    this.initializeFormFields();
  }
  private initializeFormFields() : void{
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
    this.authService.signIn(reqPayload).pipe(takeUntil(this.unsubscribe)).subscribe((res:any)=>{

    },err =>{
      console.log(err);
    })
  }
  navigateTo(){
    this.router.navigate(['/signup']);
  }
  ngOnDestroy(){
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }
}
