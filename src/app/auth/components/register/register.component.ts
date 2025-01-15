import {Component, OnInit} from '@angular/core'
import {CommonModule} from '@angular/common'
import {RouterLink} from '@angular/router'
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms'
import {select, Store} from '@ngrx/store'
import {registerAction} from '../../store/actions/register.action'
import {Observable} from 'rxjs'
import {isSubmittingSelector, validationErrorsSelector} from '../../store/selector'
import {ButtonModule} from 'primeng/button'
import {InputTextModule} from 'primeng/inputtext'
import {FloatLabelModule} from 'primeng/floatlabel'

import {RegisterRequestInterface} from '../../types/registerRequest.interface'
import {AppStateInterface} from '../../../shared/types/appState.interface'
import {BackendErrorsInterface} from '../../../shared/types/backendErrors.interface'
import {
  BackendErrorMessagesComponent
} from '../../../shared/components/backend-error-messages/backend-error-messages.component'


@Component({
  selector: 'mc-register',
  standalone: true,
  imports: [CommonModule,
    RouterLink,
    ReactiveFormsModule,
    ButtonModule,
    InputTextModule,
    FloatLabelModule,
    BackendErrorMessagesComponent
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent implements OnInit{
  public formRegister: FormGroup
  isSubmitting$: Observable<boolean>
  backendErrors$ : Observable<BackendErrorsInterface | null>

  get name(): any {
    return this.formRegister.get('username')
  }

  get email(): any {
    return this.formRegister.get('email')
  }

  get password(): any {
    return this.formRegister.get('password')
  }

  constructor(private fb: FormBuilder, private store: Store<AppStateInterface>) {
  }

  ngOnInit(): void {
    // Лучше всего в ngOnInit делать вызовы методов, не более.
    this.initializeForm()
    this.initializeValues()
  }

  initializeValues(): void {
    this.isSubmitting$ = this.store.pipe(select(isSubmittingSelector)) // Выбираем данные по нашему селектору из хранилища и устанавливаем в этот Observable
    this.backendErrors$ = this.store.pipe(select(validationErrorsSelector))
  }

  //Форма регистрации
  initializeForm(): void {
    this.formRegister = this.fb.group({
      username: ['', Validators.required],
      email: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(8)]]
    })
  }

  //Кнопка регистрации
  onSubmit(): void {
    const request: RegisterRequestInterface = {
      user: this.formRegister.value
    }
    this.store.dispatch(registerAction({request})) //Говорим стору что у нас произошло какое-то действие и передаем обьект данных
    this.formRegister.reset()
  }
}
