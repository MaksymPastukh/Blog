import {FileInterface} from './file.interface'

export interface ChartData {
  id: string;
  name: string,
  size: string,
  timestamp: string;
  data: FileInterface;
}
