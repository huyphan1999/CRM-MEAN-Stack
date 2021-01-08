import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthenticationService } from './authenticate.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  username = '';
  password = '';

  constructor(
    private authenticationService: AuthenticationService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  login = () => {
    this.authenticationService.login(this.username, this.password).subscribe(
      (data) => {
        console.log(data);
        if (data != null && data.token) {
          console.log('login Success');
          // this.router.navigateByUrl('/productList');
          this.router.navigateByUrl('');
        } else {
          console.log('login fail');
        }
      },
      (err) => console.error(err)
    );
  };

  loginWithGoogle = () => {
    window.location.href = 'http://localhost:8080/api/auth/google';
  };
  loginWithFb = () => {
    window.location.href = 'http://localhost:8080/api/auth/facebook';
  };
  keyUpUsername = (event: any) => {
    let element: HTMLInputElement = event.target;
    let val: string = element.value;
    this.username = val;
  };

  keyUpPassword = (event: any) => {
    let element: HTMLInputElement = event.target;
    let val: string = element.value;
    this.password = val;
  };

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      console.log(params);
      const token = params['token'];
      if (token) {
        localStorage.clear();
        localStorage.setItem('token', token);
        this.router.navigateByUrl('');
      }
    });
  }
}
