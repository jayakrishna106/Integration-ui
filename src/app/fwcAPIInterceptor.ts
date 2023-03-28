import { Injectable } from '@angular/core';

import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';



@Injectable()
export class fwcAPIInterceptor implements HttpInterceptor {
  intercept (req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

  const authReq = req.clone({
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
      'ATLASMAP-XSRF-TOKEN': 'awesome'
    })
  });

 // console.log('Intercepted HTTP call', authReq);

  return next.handle(authReq);
}
}