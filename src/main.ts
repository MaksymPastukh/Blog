import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';


// Запуск приложения с использованием AppComponent как корневого компонента
bootstrapApplication(AppComponent, appConfig,)
  // Обработка ошибок, которые могут возникнуть при загрузке
  .catch((err) => console.error(err));
