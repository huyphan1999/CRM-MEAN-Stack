import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpResponse,
  HttpHandler,
  HttpEvent,
  HttpErrorResponse,
} from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { map, catchError } from 'rxjs/operators';

@Injectable()
export class HttpConfigInterceptor implements HttpInterceptor {
  constructor(private router: Router) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<any> {
    const token: string = localStorage.getItem('token');

    request = request.clone({
      headers: request.headers.set('Authorization', 'Bearer ' + token),
    });

    if (!request.headers.has('Content-Type')) {
      request = request.clone({
        headers: request.headers.set('Content-Type', 'application/json'),
      });
    }

    request = request.clone({
      headers: request.headers.set('Accept', 'application/json'),
    });

    return next.handle(request).pipe(
      map((event: HttpEvent<any>) => {
        if (event instanceof HttpResponse) {
          console.log('event--->>>', event);
        }
        return event;
      }),
      catchError((error: HttpErrorResponse) => {
        if (error.status === 403) {
          //when the API service return any 401-Unauthorized error control come here,
          //Call logoutUser to clear and redirect to login page.
          console.log('Handle 403');
          alert('Phiên đã hết hạn');
          localStorage.clear();
          this.router.navigate(['/login']); //You can Navigate to the router directly, in this example it will be done in authHelperService.
        }

        return throwError(error);
      })
    );
  }
}
