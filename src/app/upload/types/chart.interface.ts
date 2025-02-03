import {ChartData} from './data.interface'

export interface ChartState {
  data: ChartData[];
  loading: boolean;
  error: string | null;
}
