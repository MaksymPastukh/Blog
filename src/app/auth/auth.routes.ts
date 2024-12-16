import { Routes } from '@angular/router';

export default [
  {
    path: 'register',
    loadComponent: () =>
      import('./components/register/register.component').then(c => c.RegisterComponent),
  },
] as Routes;


