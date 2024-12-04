import {ApplicationConfig, isDevMode, provideZoneChangeDetection} from '@angular/core'
import {provideRouter} from '@angular/router'

import {routes} from './app.routes'
import {provideStore} from '@ngrx/store'
import {provideStoreDevtools} from '@ngrx/store-devtools' // Ваши редьюсеры

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({eventCoalescing: true}),  // Оптимизация событий
    provideRouter(routes), // Маршруты
    provideStore({}), // Подключаем Store reducers
    provideStoreDevtools({
      maxAge: 25, //Сохраняет последние 25 состояний
      logOnly: !isDevMode(), // Ограничение расширения до режима только для ведения журнала
      autoPause: true, // Приостанавливает запись действий и изменения состояния, когда окно расширения не открыто
      trace: false, //  Если установлено значение true, трассировка стека будет включена для каждого отправленного действия, так что вы можете увидеть его на вкладке трассировки, перейдя непосредственно к этой части кода
      traceLimit: 75, // Максимальное количество хранимых кадров трассировки стека (в случае, если для параметра трассировки указано значение true)
      connectInZone: true // Если задано значение true, соединение устанавливается в зоне Angular
    }),
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
