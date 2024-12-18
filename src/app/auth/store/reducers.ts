import {AuthStateInterface} from '../types/authState.interface'
import {createReducer, on} from '@ngrx/store'
import {registerAction, registerFailureAction, registerSuccessAction} from './actions/register.action'


const initialState: AuthStateInterface = {
  isSubmitting: false,
  currentUser: null,
  isLoggedIn: null,
  validationErrors: null,
}

export const authReducer = createReducer(
  initialState,
  on(registerAction,
    (state): AuthStateInterface => ({
    ...state,
    isSubmitting: true, validationErrors: null
  })),

  on(registerSuccessAction,
    (state, action): AuthStateInterface => ({
      ...state,
      isSubmitting: false,
      isLoggedIn: true,
      currentUser: action.currentUser,
    })),

  on(registerFailureAction,
    (state, action): AuthStateInterface => ({
      ...state,
      isSubmitting: false,
      validationErrors: action.errors,
    }))
)

