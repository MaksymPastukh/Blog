import {Actions, createEffect, ofType} from '@ngrx/effects'
import {inject} from '@angular/core'
import {AuthService} from '../../services/auth.service'
import {registerAction, registerFailureAction, registerSuccessAction} from '../actions/register.action'
import {catchError, map, of, switchMap, tap} from 'rxjs'
import {CurrentUserInterface} from '../../../shared/types/currentUser.interface'
import {HttpErrorResponse} from '@angular/common/http'
import {PersistanceService} from '../../../shared/services/persistance.service'
import {Router} from '@angular/router'

/**
 * С помощью Effect мы работаем с API
 * Effect слушают наши Action и потом вызывают Service и таким образом мы обращаемся к API
 */

export const registerEffect = createEffect(
  (actions$ = inject(Actions),
   authService = inject(AuthService),
   persistenceService = inject(PersistanceService)) => {
    return actions$.pipe(
      ofType(registerAction),  // Сводим до одного action наш массив actions
      switchMap(({request}) => {
        return authService.register(request).pipe(
          map((currentUser: CurrentUserInterface) => {
            persistenceService.set('accessToken', currentUser.token)
            return registerSuccessAction({currentUser})
          }),
          catchError((errorResponse: HttpErrorResponse) => {
            return of(registerFailureAction({errors: errorResponse.error.errors}))
          })
        )
      })
    )
  },
  {functional: true}
)

export const redirectAfterSubmit = createEffect(
  (actions$ = inject(Actions), router = inject(Router)) => actions$.pipe(
    ofType(registerSuccessAction),
    tap(() => {
      router.navigate(['/'])
    })
  ), {
    dispatch: false,
    functional: true
  })
