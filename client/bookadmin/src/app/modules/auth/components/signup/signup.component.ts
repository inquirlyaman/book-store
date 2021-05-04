import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from '../../services';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit, OnDestroy {
  /*
   * login form 
  */
  signUpForm: FormGroup;
  /*
  * to validate the form after submiting
  */
  submitted = false;
  unsubscribe = new Subject<void>();
  constructor(private bookStoreFormBuilder: FormBuilder,
    private authService: AuthenticationService) { }

  ngOnInit() {
    this.initializeFormFields();
  }
  /*
   * initializeFormFields for the formcontrol
  */
  private initializeFormFields() {
    this.signUpForm = this.bookStoreFormBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]]
    })
  }
  get signupFrm() { return this.signUpForm.controls };
  /*
   * API call to register the user 
  */
  submit() {
    this.submitted = true;
    if (this.signUpForm.invalid) {
      return;
    }
    const reqPayload = {
      email: this.signUpForm.value.email,
      password: this.signUpForm.value.password
    }
    this.authService.signUp(reqPayload).pipe(takeUntil(this.unsubscribe)).subscribe((res) => {

    }, err => {

    })
  }
  ngOnDestroy() {
    this.unsubscribe.complete();
    this.unsubscribe.next();
  }
}
