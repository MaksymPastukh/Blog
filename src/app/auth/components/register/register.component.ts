import {Component, OnInit} from '@angular/core'
import {CommonModule} from '@angular/common'
import {RouterLink} from '@angular/router'
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms'
import {select, Store} from '@ngrx/store'
import {registerAction} from '../../store/actions/register.action'
import {Observable} from 'rxjs'
import {isSubmittingSelector} from '../../store/selector'

@Component({
  selector: 'mc-register',
  standalone: true,
  imports: [CommonModule, RouterLink, ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent implements OnInit {
  public formRegister: FormGroup
  isSubmitting$: Observable<boolean>

  get name(): any {
    return this.formRegister.get('username')
  }

  get email(): any {
    return this.formRegister.get('email')
  }

  get password(): any {
    return this.formRegister.get('password')
  }

  constructor(private fb: FormBuilder, private store: Store) {
  }

  ngOnInit(): void {
    this.initializeForm()
    this.initializeValues()
  }

  initializeValues(): void {
    this.isSubmitting$ = this.store.pipe(
      select(isSubmittingSelector) // Выбираем данные по нашему селектору из хранилища и устанавливаем в этот Observable
    )
    console.log('isSubmitting', this.isSubmitting$)

  }


  initializeForm(): void {
    this.formRegister = this.fb.group({
      username: ['', Validators.required],
      email: ['', [Validators.required]],
      password: ['', Validators.required]
    })
  }

  onSubmit(): void {
    this.store.dispatch(registerAction(this.formRegister.value)) //Говорим стору что у нас произошло какое-то действие
  }

}
