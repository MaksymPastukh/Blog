import {Component, Input, OnInit} from '@angular/core'
import {BackendErrorsInterface} from '../../types/backendErrors.interface'
import {CommonModule} from '@angular/common'

@Component({
  selector: 'mc-backend-error-messages',
  imports: [CommonModule],
  template: `
    <ul class="visible-error text-right mb-2 text-red-500 text-1xl">
      <li *ngFor="let errorMessage of errorMessages"> - {{ errorMessage }}</li>
    </ul>
  `
})
export class BackendErrorMessagesComponent implements OnInit {
  @Input('backendErrors') backendErrorsProps: BackendErrorsInterface

  errorMessages: string[] = []

  ngOnInit(): void {
    this.errorMessages = Object.keys(this.backendErrorsProps).map((name: string) =>{
      const messages = this.backendErrorsProps[name].join(', ')
      return `${name} ${messages}`
    })
  }
}
