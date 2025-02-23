import {Component, computed, effect, signal, WritableSignal} from '@angular/core'

@Component({
  selector: 'app-rxjs',
  imports: [],
  templateUrl: './rxjs.component.html',
  styleUrl: './rxjs.component.scss'
})
export class RxjsComponent {
  firstName: WritableSignal<string>
  isTrail: WritableSignal<boolean> = signal(false)
  isTrailExpired:WritableSignal<boolean> = signal(false)
  showTrailDuration = computed(() => this.isTrail() && !this.isTrailExpired())
  count: WritableSignal<number> = signal(0)

  constructor() {
    effect(() => {
      console.log(`The count is : ${this.count()}`)
    })
  }

  fn() {
    this.firstName = signal('morgan')
    console.log(this.firstName())
    this.firstName.set('Jaime')
    console.log(this.firstName())
    this.firstName.update(name => name.toUpperCase());
    console.log(this.firstName())
  }

  fnComputed() {
    this.firstName = signal('morgan')
    let firstNameCapitalized = computed(() => this.firstName().toUpperCase())
    console.log(firstNameCapitalized())

    this.firstName.set('Max')
    console.log(firstNameCapitalized())
  }

  activeTrial() : void {
    this.isTrail.set(true)
    console.log(this.showTrailDuration())
  }
}
