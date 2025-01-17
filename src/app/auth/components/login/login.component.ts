import { Component } from '@angular/core';
import {RouterLink} from '@angular/router'
import {CommonModule} from '@angular/common'
import {Button} from 'primeng/button'

@Component({
  selector: 'c-login',
  imports: [
    CommonModule,
    RouterLink,
    Button
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

}
