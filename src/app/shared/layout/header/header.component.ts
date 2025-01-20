import { Component } from '@angular/core';
import {RouterLink} from '@angular/router'
import {HomeIcon} from 'primeng/icons/home'

@Component({
  selector: 'app-header',
  imports: [
    RouterLink,
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {

}
