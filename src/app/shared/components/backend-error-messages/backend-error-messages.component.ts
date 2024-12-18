import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core'
import {BackendErrorsInterface} from '../../types/backendErrors.interface'
import {CommonModule} from '@angular/common'

@Component({
  selector: 'app-backend-error-messages',
  imports: [CommonModule ],
  templateUrl: './backend-error-messages.component.html',
  styleUrl: './backend-error-messages.component.scss'
})
export class BackendErrorMessagesComponent implements OnInit {
  @Input('backendErrors') backendErrorsProps: BackendErrorsInterface;

  errorMessages: string[]

  ngOnInit() {
    this.errorMessages = Object.keys(this.backendErrorsProps).map(
      (name:string) => {
          const message = this.backendErrorsProps[name].join(', ')
      return `${message}`
    })
  }

}
