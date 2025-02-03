import { createReducer, on } from '@ngrx/store';
import {ChartActions} from './actions/data.action'
import {ChartState} from '../types/chart.interface'


export const initialState: ChartState = {
  data: JSON.parse(localStorage.getItem('chartData') || '[]'),
  loading: false,
  error: null
};

export const chartReducer = createReducer(
  initialState,
  on(ChartActions.loadChartDataSuccess, (state, { data }) => {
    const newData = [...state.data, data];
    localStorage.setItem('chartData', JSON.stringify(newData));
    return {
      ...state,
      data: newData,
      loading: false
    };
  }),
  on(ChartActions.clearChartData, () => {
    localStorage.removeItem('chartData')// Очистить localStorage
    return initialState; // Вернуть начальное состояние
  })
);
