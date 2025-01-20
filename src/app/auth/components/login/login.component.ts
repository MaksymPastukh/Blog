import {Component, OnInit} from '@angular/core'
import {RouterLink} from '@angular/router'
import {CommonModule} from '@angular/common'
import {Button} from 'primeng/button'
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms'
import {LoginRequestInterface} from '../../types/loginRequest.interface'
import {AppStateInterface} from '../../../shared/types/appState.interface'
import {Store} from '@ngrx/store'
import {loginAction} from '../../store/actions/login.action'

@Component({
  selector: 'c-login',
  imports: [
    CommonModule,
    RouterLink,
    Button,
    ReactiveFormsModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {
  public formSingIn: FormGroup

  constructor(private fb: FormBuilder, private store: Store<AppStateInterface>) {
  }


  get email(): any {
    return this.formSingIn.get('email')
  }

  get password(): any {
    return this.formSingIn.get('password')
  }


  ngOnInit() {
    this.initializeForm()
  }


  initializeForm(): void {
    this.formSingIn = this.fb.group({
      email: ['', [Validators.email, Validators.required]],
      password: ['', Validators.required]
    })
  }

  onSingIn(): void {
    const request: LoginRequestInterface = {
      user: this.formSingIn.value
    }

    this.store.dispatch(loginAction({request}))
    this.formSingIn.reset()
  }
}
