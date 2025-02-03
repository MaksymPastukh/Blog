import {Routes} from '@angular/router'
import {LayoutComponent} from './shared/layout/layout.component'
import {MainComponent} from './views/main/main.component'

export const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {path: '', component: MainComponent},
      {
        path: '',
        loadChildren: () => import('./auth/auth.routes')
      },
      {
        path: '',
        loadChildren: () => import('./upload/upload.routes')
      },
      {
        path: '',
        loadChildren: () => import('./theory/theory.routes')
      }
    ]
  }
]
