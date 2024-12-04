import {Component, OnInit} from '@angular/core'
import {CommonModule} from '@angular/common'
import {RouterLink} from '@angular/router'
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms'
import {Store} from '@ngrx/store'
import {registerAction} from '../../store/actions/register.action'

@Component({
  selector: 'mc-register',
  standalone: true,
  imports: [CommonModule, RouterLink, ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent implements OnInit {
  public formRegister: FormGroup

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
  }

  initializeForm(): void {
    this.formRegister = this.fb.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    })
  }

  onSubmit(): void {
    this.store.dispatch(registerAction(this.formRegister.value)) //Говорим стору что у нас произошло какое-то действие
  }

}
