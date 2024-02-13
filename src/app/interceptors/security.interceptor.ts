import { Injectable } from '@angular/core';
import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpParams,
  HttpRequest,
  HttpResponse
} from '@angular/common/http';
import { Router } from '@angular/router';

import { select, Store } from '@ngrx/store';

import { Observable, throwError } from 'rxjs';
import { catchError, filter, mergeMap } from 'rxjs/operators';

import { ToastrService } from 'ngx-toastr';

import { AppStateInterface } from '../models/app-state.interface';

import { selectSecurity } from '../selectors/security.selectors';

@Injectable({providedIn: 'root'})
export class SecurityInterceptor implements HttpInterceptor {


 

  constructor(private store: Store<AppStateInterface>,
              private router: Router,
              private toastrService: ToastrService) {
    console.log('Security Interceptor loaded');
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

   console.log("esta entrando a interceptor");




  return this.store.pipe(select(selectSecurity))
      .pipe(mergeMap(({ encrypt, appId }) => next.handle(req.clone({
        params: (req.params || new HttpParams()).append('encrypt', encrypt)
          .append('appId', `${ appId }`)
      })).pipe(filter(response => response instanceof HttpResponse),
        catchError((error: HttpErrorResponse) => {
          console.error(error);
          if (error.status === 0) {
            // Its a different error, angular fail to send the request, maybe is a CORS error
            this.router.navigate(['unauthorized-user'])
              .then(() => this.toastrService
                .error('Las credenciales no son validas o caducaron', 'Credentiales incorrectas'));
          } else if (error.status === 401 || error.status === 403) {
            this.router.navigate(['unauthorized-user'])
              .then(() => this.toastrService
                .error('Las credenciales no son validas o caducaron', 'Credentiales incorrectas'));
          }
          return throwError(error);
        }))));
  }


  manejarError(error:HttpErrorResponse){
    console.log("sucedio un error");
    return throwError('error  en peticion');
  }
}
