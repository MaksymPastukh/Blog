import {Component, OnInit} from '@angular/core'
import {RouterLink} from '@angular/router'
import {CommonModule} from '@angular/common'
import {Button} from 'primeng/button'
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms'

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

  constructor(private fb: FormBuilder) {
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

  }
}
