import {Component, computed, EventEmitter, Input, Output, Signal} from '@angular/core'
import {BackendErrorsInterface} from '../../types/backendErrors.interface'
import {CommonModule} from '@angular/common'

@Component({
  selector: 'app-backend-error-messages',
  imports: [CommonModule ],
  template: `
    <ul class="visible-error text-right mb-2 text-red-500 text-1xl">
      <li *ngFor="let errorMessage of errorMessages()"> - {{errorMessage}}</li>
    </ul>
  `,
})
export class BackendErrorMessagesComponent {
  @Input('backendErrors') backendErrorsProps: Signal<BackendErrorsInterface>
  @Output() dataFromChild: EventEmitter<BackendErrorsInterface> = new EventEmitter<BackendErrorsInterface>();

  errorMessages: Signal<string[]> = computed(() => {
    const errors: BackendErrorsInterface = this.backendErrorsProps()
    if(!errors) return []
    setTimeout(() => {
      this.dataFromChild.emit(errors)
    })

    return Object.keys(errors).map((fieldErrors: string)=> {
      const message = errors[fieldErrors].join(',' ) || ''
      return `${fieldErrors} ${message}`
    })
  })

}
