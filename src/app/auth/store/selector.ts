import {AppStateInterface} from '../../shared/types/appState.interface'
import {AuthStateInterface} from '../types/authState.interface'
import {createSelector} from '@ngrx/store'
import {BackendErrorsInterface} from '../../shared/types/backendErrors.interface'
import {CurrentUserInterface} from '../../shared/types/currentUser.interface'

/**
 * @param state
 * Селекторы нам позволяют извлечь данные из Store
 * @returns state.auth
 * @returns authState.isSubmitting
 * @returns authState.validationErrors
 */

export const authFeatureSelector = (state: AppStateInterface): AuthStateInterface => state.auth

export const isSubmittingSelector = createSelector(
  authFeatureSelector,
  (authState: AuthStateInterface):boolean => authState.isSubmitting
)

export const validationErrorsSelector = createSelector(
  authFeatureSelector,
  (authState: AuthStateInterface): BackendErrorsInterface => authState.validationErrors
)


export const isLoggedOnOffSelector = createSelector(
  authFeatureSelector,
  (authState: AuthStateInterface): boolean => authState.isLoggedIn === false
)

export const currentUserSelector = createSelector(
  authFeatureSelector,
  (authState: AuthStateInterface): CurrentUserInterface => authState.currentUser
)



