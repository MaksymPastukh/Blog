import {Component, OnInit} from '@angular/core'
import {RouterOutlet} from '@angular/router'
import {Store} from '@ngrx/store'
import {AuthStateInterface} from './auth/types/authState.interface'
import {AppStateInterface} from './shared/types/appState.interface'
import {getCurrentUserAction} from './auth/store/actions/getCurrentUser.action'
import {HttpClient} from '@angular/common/http'

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
  ],
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit{

  constructor(private store: Store<AppStateInterface>, private http: HttpClient) {
  }

  ngOnInit():void {
    this.store.dispatch(getCurrentUserAction())
    this.http.get('https://api.example.com/data').subscribe();
  }
}
