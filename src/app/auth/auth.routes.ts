import { Routes } from '@angular/router';

export default [
  {
    path: 'register',
    loadComponent: () =>
      import('./components/register/register.component').then(c => c.RegisterComponent),
  }, {
    path: 'login',
    loadComponent: () =>
      import('./components/login/login.component').then(c => c.LoginComponent),
  },
] as Routes;


