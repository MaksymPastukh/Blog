import {Component, OnInit} from '@angular/core'
import {RouterLink} from '@angular/router'
import {Observable} from 'rxjs'
import {CurrentUserInterface} from '../../types/currentUser.interface'
import {select, Store} from '@ngrx/store'
import {AppStateInterface} from '../../types/appState.interface'
import {isLoggedOnOffSelector} from '../../../auth/store/selector'

@Component({
  selector: 'app-header',
  imports: [
    RouterLink,
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit{
  public isLoggedIn$: Observable<boolean>
  public isAnonymous$: Observable<boolean>
  public currentUser$: Observable<CurrentUserInterface | null>


  constructor(private store: Store<AppStateInterface>) {
  }

  ngOnInit() {
    this.isLoggedIn$ = this.store.pipe(select(isLoggedOnOffSelector))
  }
}
