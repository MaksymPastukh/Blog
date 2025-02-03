import { Routes } from '@angular/router';

export default [
  {
    path: 'rxjs',
    loadComponent: () =>
      import('./components/rxjs/rxjs.component').then(c => c.RxjsComponent),
  }
] as Routes;


