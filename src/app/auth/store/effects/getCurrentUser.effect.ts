import {Actions, createEffect, ofType} from '@ngrx/effects'
import {inject} from '@angular/core'
import {AuthService} from '../../services/auth.service'
import {catchError, map, of, switchMap} from 'rxjs'
import {CurrentUserInterface} from '../../../shared/types/currentUser.interface'
import {
  getCurrentUserAction,
  getCurrentUserFailureAction,
  getCurrentUserSuccessAction
} from '../actions/getCurrentUser.action'
import {PersistanceService} from '../../../shared/services/persistance.service'

export const getCurrentUserEffect = createEffect(
  (actions$ = inject(Actions),
   authService = inject(AuthService),
   persistanceService = inject(PersistanceService)) => {
    return actions$.pipe(
      ofType(getCurrentUserAction),
      switchMap(() => {
        return authService.getCurrentUser().pipe(
          map((currentUser: CurrentUserInterface) => {
            return getCurrentUserSuccessAction({currentUser})
          }),
          catchError(() => {
            return of(getCurrentUserFailureAction())
          })
        )
      })
    )
  },
  {functional: true}
)
