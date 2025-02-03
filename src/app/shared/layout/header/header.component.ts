import {Component, OnInit} from '@angular/core'
import {RouterLink} from '@angular/router'
import {Observable} from 'rxjs'
import {CurrentUserInterface} from '../../types/currentUser.interface'
import {select, Store} from '@ngrx/store'
import {AppStateInterface} from '../../types/appState.interface'
import {
  currentUserSelector,
  isAnonymousSelector,
  isLoggedInSelector
} from '../../../auth/store/selector'
import {AsyncPipe, NgIf} from '@angular/common'
import {Button} from 'primeng/button'

@Component({
  selector: 'app-header',
  imports: [
    RouterLink,
    AsyncPipe,
    NgIf,
    Button
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit {
  public isLoggedIn$: Observable<boolean>
  public isAnonymous$: Observable<boolean>
  public currentUser$: Observable<CurrentUserInterface | null>


  constructor(private store: Store<AppStateInterface>) {
  }

  ngOnInit(): void {
    this.isLoggedIn$ = this.store.pipe(select(isLoggedInSelector))
    this.isAnonymous$ = this.store.pipe(select(isAnonymousSelector))
    this.currentUser$ = this.store.pipe(select(currentUserSelector))
  }

  toggleDarkMode() {
    const element = document.querySelector('html');
    element.classList.toggle('my-app-dark');
  }
}
