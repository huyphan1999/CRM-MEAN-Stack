import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Config } from 'src/app/config/server.config';
import { User } from 'src/app/model';

const createUrl = `${Config.API_URL}user/create`;

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private httpClient: HttpClient) {}

  create(data: any): Observable<any> {
    return this.httpClient.post(`${Config.API_URL}users/create`, data);
  }

  save(data: any): Observable<any> {
    console.log('save', data);
    return this.httpClient.put(`${Config.API_URL}users/${data._id}`, data);
  }

  del(data: any): Observable<any> {
    console.log('delete', data);
    return this.httpClient.delete(`${Config.API_URL}users/${data._id}`, data);
  }

  getListUser = () => {
    console.log('getListUser');
    return this.httpClient.get(`${Config.API_URL}users`).pipe(
      map((data) => {
        console.log('getListUser0:::pipe', data);
        if (data) {
          return data;
        } else {
          return [];
        }
      })
    );
  };
}
