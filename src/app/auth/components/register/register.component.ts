import {Component, OnInit} from '@angular/core'
import {CommonModule} from '@angular/common'
import {RouterLink} from '@angular/router'
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms'
import {select, Store} from '@ngrx/store'
import {registerAction} from '../../store/actions/register.action'
import {Observable} from 'rxjs'
import {isSubmittingSelector} from '../../store/selector'
import {ButtonModule} from 'primeng/button'
import {InputTextModule} from 'primeng/inputtext'
import {FloatLabelModule} from 'primeng/floatlabel'
import {AuthService} from '../../services/auth.service'
import {RegisterRequestInterface} from '../../types/registerRequest.interface'

@Component({
  selector: 'mc-register',
  standalone: true,
  imports: [CommonModule,
    RouterLink,
    ReactiveFormsModule,
    ButtonModule,
    InputTextModule,
    FloatLabelModule
  ],
  providers: [AuthService],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent implements OnInit {
  public formRegister: FormGroup
  isSubmitting$: Observable<boolean>
  isVisibleError: boolean = false


  get name(): any {
    return this.formRegister.get('username')
  }

  get email(): any {
    return this.formRegister.get('email')
  }

  get password(): any {
    return this.formRegister.get('password')
  }

  constructor(private fb: FormBuilder, private store: Store, private authService: AuthService) {

  }

  ngOnInit(): void {
    this.initializeForm()
    this.initializeValues()
  }

  initializeValues(): void {
    this.isSubmitting$ = this.store.pipe(
      select(isSubmittingSelector) // Выбираем данные по нашему селектору из хранилища и устанавливаем в этот Observable
    )
  }


  initializeForm(): void {
    this.formRegister = this.fb.group({
      username: ['', Validators.required],
      email: ['', [Validators.required]],
      password: ['', Validators.required]
    })
  }

  onSubmit(): void {
    const request: RegisterRequestInterface = {
      user: this.formRegister.value
    }
    this.store.dispatch(registerAction({request})) //Говорим стору что у нас произошло какое-то действие
  }
}
