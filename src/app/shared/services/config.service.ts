import { Injectable } from '@angular/core';
import {environment} from '../../../environments/environment'

// Сервис создан для понимания как происходит регистрация через app.config.ts
@Injectable() //Не используем providedIn: 'root'
export class ConfigService {
  public api: string
  constructor() {}

  getApiUrl():string {
    return environment.api
  }
 }
