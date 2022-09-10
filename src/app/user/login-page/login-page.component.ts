import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { ApiService } from '../shared/services/api.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {

  public form!: FormGroup

  constructor(
    private api: ApiService,
    private cookies: CookieService,
    private router: Router) { }

  ngOnInit(): void {
    if(!!this.cookies.get('token')) this.router.navigate(['/chat']);

    this.form = new FormGroup({
      username: new FormControl('', [Validators.required, Validators.maxLength(18)]),
      password: new FormControl('', [Validators.required]),
    });
  }

  public onSubmit() {
    if(this.form.invalid) return

    const data = {
      user: this.form.get('username')!.value,
      password: this.form.get('password')!.value,
    };

    this.api.login(data).subscribe({
      next: token => {
        this.cookies.set('token', token.token);
        this.router.navigate(['/chat']);
      },
      error: err => console.log(err),
    });
  }

}
