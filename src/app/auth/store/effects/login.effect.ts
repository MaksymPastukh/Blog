import {Actions, createEffect, ofType} from '@ngrx/effects'
import {inject} from '@angular/core'
import {AuthService} from '../../services/auth.service'
import {PersistanceService} from '../../../shared/services/persistance.service'
import {loginAction, loginFailureActions, loginSuccessAction} from '../actions/login.action'
import {catchError, map, of, switchMap, tap} from 'rxjs'
import {CurrentUserInterface} from '../../../shared/types/currentUser.interface'
import {HttpErrorResponse} from '@angular/common/http'
import {Router} from '@angular/router'

export const loginEffect = createEffect(
  (actions$ = inject(Actions),
  authService = inject(AuthService),
  persistenceService = inject(PersistanceService)) => {
    return actions$.pipe(
      ofType(loginAction),
      switchMap(({request}) => {
        return authService.login(request).pipe(
          map((currentUser: CurrentUserInterface) => {
            persistenceService.setItem('accessToken', currentUser.token)
            return loginSuccessAction({currentUser})
          }),
          catchError((errorResponse: HttpErrorResponse)=> {
            return of(loginFailureActions({errors: errorResponse.error.errors}))
          })
        )
      })
    )
  },
  {functional: true}
)

export const redirectLoginAfterSubmit = createEffect(
  (actions$ = inject(Actions), router = inject(Router)) => actions$.pipe(
    ofType(loginSuccessAction),
    tap(() => {
      router.navigate(['/'])
    })
  ), {
    dispatch: false,
    functional: true
  }
)
