import {Injectable} from '@angular/core'
import {RegisterRequestInterface} from '../types/registerRequest.interface'
import {map, Observable} from 'rxjs'
import {CurrentUserInterface} from '../../shared/types/currentUser.interface'
import {HttpClient} from '@angular/common/http'
import {environment} from '../../../environments/environment'
import {AuthResponseInterface} from '../types/authResponse.interface'
import {LoginRequestInterface} from '../types/loginRequest.interface'

@Injectable(
  {
    providedIn: 'root'
  }
)
export class AuthService {
  constructor(private http: HttpClient) {
  }

  getUser(response: AuthResponseInterface) : CurrentUserInterface {
    return response.user
  }

  register(data: RegisterRequestInterface): Observable<CurrentUserInterface> {
    const url: string = `${environment.api}/users`
    return this.http
      .post<AuthResponseInterface>(url, data)
      .pipe(map(this.getUser))
  }

  login(data: LoginRequestInterface): Observable<CurrentUserInterface> {
    const url: string = `${environment.api}/users/login`
    return this.http
      .post<AuthResponseInterface>(url, data)
      .pipe(map(this.getUser))
  }
}
