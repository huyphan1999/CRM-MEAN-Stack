import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Config } from '../config/server.config';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  private currentUserSubject: Object;

  constructor(private http: HttpClient) {}

  public get currentUserValue(): Object {
    return this.currentUserSubject;
  }

  public login = (username: string, password: string) => {
    console.log('loginService::::', username);
    console.log('passwrod: ', password);

    const loginUrl = `${Config.API_URL}login`;
    console.log(loginUrl);

    return this.http
      .post<any>(loginUrl, {
        username,
        password,
      })
      .pipe(
        map((data) => {
          console.log('login:::pipe', data);
          if (data != null) {
            localStorage.setItem('token', data.token);
            return data;
          } else {
            return null;
          }
        })
      );
  };
}
