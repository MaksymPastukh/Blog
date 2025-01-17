import {createAction, props} from '@ngrx/store'
import {ActionTypes} from '../actionTypes'
import {LoginRequestInterface} from '../../types/loginRequest.interface'
import {CurrentUserInterface} from '../../../shared/types/currentUser.interface'
import {BackendErrorsInterface} from '../../../shared/types/backendErrors.interface'

export const LoginAction = createAction(
  ActionTypes.LOGIN,
  props<{request: LoginRequestInterface}>()
)

export const LoginSuccessAction = createAction(
  ActionTypes.LOGIN_SUCCESS,
  props<{currentUser: CurrentUserInterface}>()
)

export const LoginFailureActions = createAction(
  ActionTypes.LOGIN_FAILURE,
  props<{errors: BackendErrorsInterface}>
)
