import {ApplicationConfig, isDevMode, provideZoneChangeDetection} from '@angular/core'
import {provideRouter} from '@angular/router'

import {routes} from './app.routes'
import {provideStore} from '@ngrx/store'
import {provideStoreDevtools} from '@ngrx/store-devtools'
import {authReducer} from './auth/store/reducers'
import {provideAnimationsAsync} from '@angular/platform-browser/animations/async'
import {provideEffects} from '@ngrx/effects'
import {registerEffect, redirectRegisterAfterSubmit} from './auth/store/effects/register.effect'

import {provideHttpClient, withInterceptors} from '@angular/common/http'
import {loginEffect, redirectLoginAfterSubmit} from './auth/store/effects/login.effect'
import {getCurrentUserEffect} from './auth/store/effects/getCurrentUser.effect'
import {AuthInterceptor} from './shared/services/authinterceptor.service'
import {providePrimeNG} from 'primeng/config'
import Aura from '@primeng/themes/aura';
import {chartReducer} from './upload/store/data.reducers'

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(
      withInterceptors([AuthInterceptor])
    ),
    provideZoneChangeDetection({eventCoalescing: true}),  // Оптимизация событий
    provideRouter(routes), // Маршруты
    provideStore({
      auth: authReducer,
      chart: chartReducer
    }),
    provideEffects({
      registerEffect,
      redirectRegisterAfterSubmit,
      loginEffect,
      redirectLoginAfterSubmit,
      getCurrentUserEffect
    }), // Подключаем Effects
    provideStoreDevtools({
      maxAge: 25, // Количество Action которое мы хотим показывать в нашем DevTools
      logOnly: !isDevMode(), // Ограничение расширения до режима только для ведения журнала
      autoPause: true, // Приостанавливает запись действий и изменения состояния, когда окно расширения не открыто
      trace: false, //  Если установлено значение true, трассировка стека будет включена для каждого отправленного действия, так что вы можете увидеть его на вкладке трассировки, перейдя непосредственно к этой части кода
      traceLimit: 75, // Максимальное количество хранимых кадров трассировки стека (в случае, если для параметра трассировки указано значение true)
      connectInZone: true // Если задано значение true, соединение устанавливается в зоне Angular
    }),
    provideAnimationsAsync(),
    providePrimeNG({
      theme: {
        preset: Aura,
        options: {
          darkModeSelector: '.my-app-dark'
        }
      }
    })
  ]
}

/**
 *  @provideZoneChangeDetection(eventCoalescing: true)
 * Что это?
 * Это провайдер для настройки Zone.js, который управляет изменениями в DOM, вызванными событиями.
 *
 * Параметр eventCoalescing:
 *
 * Когда установлено в true, Angular будет объединять события (например, mousemove, click) и обрабатывать их одной пачкой, вместо того чтобы реагировать на каждое событие по отдельности.
 * Это может значительно улучшить производительность, особенно если в приложении есть частые события.
 */
