import { Injectable } from '@angular/core';
import {environment} from '../../../environments/environment'

@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  public api: string
  constructor() {}

  getApiUrl():string {
    return environment.api
  }
 }
