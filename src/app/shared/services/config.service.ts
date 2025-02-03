import { Injectable } from '@angular/core';
import {environment} from '../../../environments/environment'
import {Observable, of} from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  public api: string
  constructor() {}

  getApiUrl():Observable<string> {
    return of('')
  }
 }
