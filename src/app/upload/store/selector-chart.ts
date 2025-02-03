import {createSelector} from '@ngrx/store'
import {ChartState} from '../types/chart.interface'
import {AppStateInterface} from '../../shared/types/appState.interface'

export const selectChartState = (state: AppStateInterface) => state.chart

export const selectChartData = createSelector(
  selectChartState,
  (state: ChartState) => state.data
)
