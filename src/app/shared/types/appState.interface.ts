import {AuthStateInterface} from '../../auth/types/authState.interface'
import {ChartState} from '../../upload/types/chart.interface'

export interface AppStateInterface {
  auth: AuthStateInterface
  chart: ChartState
}
