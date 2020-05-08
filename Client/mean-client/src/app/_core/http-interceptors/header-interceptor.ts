import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpHeaders } from '@angular/common/http';
import { Store, select } from '@ngrx/store';
import * as appActions from '../../state/app-actions';
import * as fromApp from '../../state';
import { first, flatMap } from 'rxjs/operators';

@Injectable()
export class HeadersInterceptor implements HttpInterceptor {

    constructor(private store: Store<fromApp.State>) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if (req.headers.has('auth')) {
            const auth = req.headers.get('auth');

            if (!!auth === true) {
                return this.store.select(fromApp.getToken).pipe(
                    first(),
                    flatMap(token => {
                        const jsonAuthReq: HttpRequest<any> = req.clone({
                            setHeaders: {
                                'Content-Type': 'application/json',
                                'Access-Control-Allow-Origin': '*',
                                'Accept': 'application/json',
                                'authorization': `Bearer ${token.accessToken}`
                            }
                        });

                        return next.handle(jsonAuthReq);
                    }),
                );
            }
        }

        const jsonReq: HttpRequest<any> = req.clone({
            setHeaders: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Accept': 'application/json'
            }
        });

        return next.handle(jsonReq);
    }
}
