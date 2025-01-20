import {Component, OnInit} from '@angular/core'
import {RouterLink} from '@angular/router'
import {CommonModule} from '@angular/common'
import {Button} from 'primeng/button'
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms'
import {LoginRequestInterface} from '../../types/loginRequest.interface'
import {AppStateInterface} from '../../../shared/types/appState.interface'
import {select, Store} from '@ngrx/store'
import {loginAction} from '../../store/actions/login.action'
import {Observable} from 'rxjs'
import {BackendErrorsInterface} from '../../../shared/types/backendErrors.interface'
import {isSubmittingSelector, validationErrorsSelector} from '../../store/selector'
import {
  BackendErrorMessagesComponent
} from '../../../shared/components/backend-error-messages/backend-error-messages.component'

@Component({
  selector: 'c-login',
  imports: [
    CommonModule,
    RouterLink,
    Button,
    ReactiveFormsModule,
    BackendErrorMessagesComponent
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {
  public formSingIn: FormGroup
  public isSubmitting$: Observable<boolean>
  public backendErrors$: Observable<BackendErrorsInterface | null>

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
    this.initializeValue()
  }


  initializeForm(): void {
    this.formSingIn = this.fb.group({
      email: ['', [Validators.email, Validators.required]],
      password: ['', Validators.required]
    })
  }

  initializeValue() {
    this.isSubmitting$ = this.store.pipe(select(isSubmittingSelector))
    this.backendErrors$ = this.store.pipe(select(validationErrorsSelector))
  }

  onSingIn(): void {
    const request: LoginRequestInterface = {
      user: this.formSingIn.value
    }

    this.store.dispatch(loginAction({request}))
    this.formSingIn.reset()
  }
}
