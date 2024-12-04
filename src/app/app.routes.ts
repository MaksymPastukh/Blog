import {Routes} from '@angular/router'

export const routes: Routes = [
  // {
  //   path: '',
  //   component: AppComponent,
  //   children: [
  //     {path: '', component: MainComonent},
  //     {path:'/register',
  //       loadChildren: () => import('./auth/components/register/register.component').then(c => c.RegisterComponent)
  //     }
  //   ]
  // }

  {
    path: '',
    loadChildren: () => import('./auth/auth-routing.module').then(m => m.AuthRoutingModule)
  }
]
