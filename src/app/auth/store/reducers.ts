import {AuthStateInterface} from '../types/authState.interface'
import {createReducer, on} from '@ngrx/store'
import {registerAction} from './actions/register.action'


const initialState: AuthStateInterface = {
  isSubmitting: false
}

export const authReducer = createReducer(
  initialState,
  on(registerAction, (state): AuthStateInterface => ({
    ...state,
    isSubmitting: true
  }))
)

