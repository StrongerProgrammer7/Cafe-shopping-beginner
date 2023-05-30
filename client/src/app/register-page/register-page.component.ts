import { Component,OnDestroy,OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute,Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { MaterialService } from '../shared/middleware/material.service';
import { AuthService } from '../shared/services/auth.service';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.css']
})
export class RegisterPageComponent implements OnInit, OnDestroy
{

  form: FormGroup = new FormGroup(
    {
      email: new FormControl(null,[Validators.required,Validators.email]),
      password: new FormControl(null,[Validators.required,Validators.minLength(4)])
    }
  );

  aSub: Subscription = new Subscription
  constructor(private router: Router,
              private route: ActivatedRoute,
              private auth: AuthService) {}

  ngOnInit(): void
  {

  };
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
      password: this.form.value.password
    };

      this.aSub = this.auth.register(user).subscribe(
      {
        next: (v) => this.router.navigate(['/login'],
        {
          queryParams:
          {
            registered: true
          }
        }),
        error: (e) =>
        {
          MaterialService.toast(e.error.message);
          console.error(e);
          this.form.enable();
        },
        complete: () => console.info('complete: register')
      }
    );

  }
}
