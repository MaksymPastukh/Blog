import {inject} from '@angular/core'
import {HttpEvent, HttpEventType, HttpHandlerFn, HttpRequest} from '@angular/common/http'
import {Observable, tap} from 'rxjs'
import {PersistanceService} from './persistance.service'

export function AuthInterceptor(req: HttpRequest<unknown>, next: HttpHandlerFn): Observable<HttpEvent<unknown>> {
  const token = inject(PersistanceService).getItem('accessToken')
  const modifiedReq = req.clone({
    setHeaders: {
      Authorization: token ? `Token ${token}` : ''
    }
  });

  return next(modifiedReq).pipe(tap(event => {
    if (event.type === HttpEventType.Response) {
      console.log(req.url, 'returned a response with status', event.status);
    }
  }));
}
