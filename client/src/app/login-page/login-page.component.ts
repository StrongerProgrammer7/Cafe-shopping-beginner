import { Component, OnInit,OnDestroy } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { MaterialService } from '../shared/middleware/material.service';
import { AuthService } from '../shared/services/auth.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit, OnDestroy
{
  form: FormGroup = new FormGroup(
    {
      email: new FormControl(null,[Validators.required,Validators.email]),
      password: new FormControl(null,[Validators.required,Validators.minLength(4)])
    }
  );
  aSub: Subscription = new Subscription;
  constructor(private auth: AuthService,
              private router: Router,
              private route: ActivatedRoute) {}

  ngOnInit(): void
  {
    this.route.queryParams.subscribe(
      {
        next: (params: Params) =>
        {
          if(params['registered'])
          {
            MaterialService.toast('Now you can sign up system, with your data');
          }else if (params['accessDenied'])
          {
            MaterialService.toast('Begin register,after sign up');
          }else if (params['sessionFailed'])
          {
            MaterialService.toast('Pleasy repeat sign up')
          }
        },
        error: (e) => console.error(e),
        complete: () => console.log('complete loggedin')
      }
    )
  }
  ngOnDestroy(): void
  {
    if(this.aSub)
      this.aSub.unsubscribe();
  }

  onSubmit()
  {
    this.form.disable();
    const user =
    {
      email:this.form.value.email,
      password:this.form.value.password
    };
    this.aSub = this.auth.login(user).subscribe(
     {
      next: (v) => console.log(v), //this.router.navigate(['/overview'])
      error: (e) =>
      {
        MaterialService.toast(e.error.message);
        console.warn(e);
        this.form.enable()
      },
      complete: () => console.info('complete: loggedin')
     }
    );
  }
}
