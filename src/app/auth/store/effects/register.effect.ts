import {Actions, createEffect, ofType} from '@ngrx/effects'
import {inject} from '@angular/core'
import {AuthService} from '../../services/auth.service'
import {registerAction, registerFailureAction, registerSuccessAction} from '../actions/register.action'
import {catchError, map, of, switchMap} from 'rxjs'
import {CurrentUserInterface} from '../../../shared/types/currentUser.interface'

export const registerEffect = createEffect(
  (actions$ = inject(Actions), authService = inject(AuthService)) => {
    return actions$.pipe(
      ofType(registerAction),
      switchMap(({ request }) => {
        return authService.register(request).pipe(
          map((currentUser: CurrentUserInterface) => {
            return registerSuccessAction({ currentUser });
          }),
          catchError(() => {
            return of(registerFailureAction());
          }),
        );
      }),
    );
  },
  { functional: true },
);
