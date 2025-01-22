import {AuthStateInterface} from '../types/authState.interface'
import {createReducer, on} from '@ngrx/store'
import {registerAction, registerFailureAction, registerSuccessAction} from './actions/register.action'
import {loginAction, loginFailureActions, loginSuccessAction} from './actions/login.action'
import {
  getCurrentUserAction,
  getCurrentUserFailureAction,
  getCurrentUserSuccessAction
} from './actions/getCurrentUser.action'

/**
 * Это специальные функции которые следят за Action и меняют глобальное состояние
 * Происходит Action, редьюсеры это отследили и что-то изменили, а потом с помощью селекторов мы
 * можем выбирать часть данных из нашего Store и отрисовывать это в Component
 */

const initialState: AuthStateInterface = {
  isSubmitting: false,
  isLoading: false,
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
    })),

  on(loginAction, (state): AuthStateInterface => ({
    ...state,
    isSubmitting: true,
    validationErrors: null
  })),

  on(loginSuccessAction,
    (state, actin): AuthStateInterface => ({
      ...state,
      isSubmitting: false,
      isLoggedIn: true,
      currentUser: actin.currentUser
    })),

  on(loginFailureActions,
    (state, action): AuthStateInterface => ({
      ...state,
      isSubmitting: false,
      validationErrors: action.errors,
    })),

  on(getCurrentUserAction,
    (state): AuthStateInterface => ({
      ...state,
      isLoading: true
    })),

  on(getCurrentUserSuccessAction,
    (state, action): AuthStateInterface => ({
      ...state,
      isLoading: false,
      isLoggedIn: true,
      currentUser: action.currentUser
    })),

  on(getCurrentUserFailureAction,
    (state): AuthStateInterface => ({
      ...state,
      isLoading: false,
      isLoggedIn: false,
      currentUser: null
    })),

)

