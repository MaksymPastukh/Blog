import {ChangeDetectionStrategy, Component, OnInit, signal} from '@angular/core'
import {RouterOutlet} from '@angular/router'
import {HeaderComponent} from './header/header.component'
import {FooterComponent} from './footer/footer.component'

@Component({
  selector: 'app-layout',
  imports: [
    RouterOutlet,
    HeaderComponent,
    FooterComponent
  ],
  templateUrl: './layout.component.html'
})
export class LayoutComponent {
}
