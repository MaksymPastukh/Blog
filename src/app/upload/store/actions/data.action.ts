import {createAction, props} from '@ngrx/store'
import {ChartData} from '../../types/data.interface'
import {ActionTypesUploadedFile} from '../actionTypesChart'

export const loadChartData = createAction(
  ActionTypesUploadedFile.CHART)
export const loadChartDataSuccess = createAction(
  ActionTypesUploadedFile.CHARY_LOAD_SUCCESS,
  props<{data: ChartData}>()
)

export const clearChartData = createAction(ActionTypesUploadedFile.CHARY_CLEAN_STORE);


export const ChartActions = {
  loadChartData,
  loadChartDataSuccess,
  clearChartData
}
