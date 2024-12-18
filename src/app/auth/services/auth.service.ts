import {Injectable} from '@angular/core'
import {RegisterRequestInterface} from '../types/registerRequest.interface'
import {map, Observable} from 'rxjs'
import {CurrentUserInterface} from '../../shared/types/currentUser.interface'
import {HttpClient} from '@angular/common/http'
import {environment} from '../../../environments/environment'
import {AuthResponseInterface} from '../types/authResponse.interface'

@Injectable(
  {
    providedIn: 'root'
  }
)
export class AuthService {
  constructor(private http: HttpClient) {
  }

  register(data: RegisterRequestInterface): Observable<CurrentUserInterface> {
    const url: string = environment.api + '/users'
    return this.http
      .post<AuthResponseInterface>(url, data)
      .pipe(map((response: AuthResponseInterface) => response.user))
  }
}

// Qwerty123q1
