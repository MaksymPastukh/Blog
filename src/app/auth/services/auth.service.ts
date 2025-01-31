import {Injectable} from '@angular/core'
import {RegisterRequestInterface} from '../types/registerRequest.interface'
import {map, Observable} from 'rxjs'
import {CurrentUserInterface} from '../../shared/types/currentUser.interface'
import {HttpClient} from '@angular/common/http'
import {AuthResponseInterface} from '../types/authResponse.interface'
import {LoginRequestInterface} from '../types/loginRequest.interface'
import {ConfigService} from '../../shared/services/config.service'

@Injectable(
  {
    providedIn: 'root'
  }
)
export class AuthService {
  constructor(private http: HttpClient, private configService: ConfigService) {
  }

  getUser(response: AuthResponseInterface) : CurrentUserInterface {
    return response.user
  }

  register(data: RegisterRequestInterface): Observable<CurrentUserInterface> {
    const url: string = `${this.configService.getApiUrl()}/users`
    return this.http
      .post<AuthResponseInterface>(url, data)
      .pipe(map(this.getUser))
  }

  login(data: LoginRequestInterface): Observable<CurrentUserInterface> {
    const url: string = `${this.configService.getApiUrl()}/users/login`
    return this.http
      .post<AuthResponseInterface>(url, data)
      .pipe(map(this.getUser))
  }

  getCurrentUser(): Observable<CurrentUserInterface> {
    const url: string = `${this.configService.getApiUrl()}/user`
    return  this.http.get(url)
      .pipe(map(this.getUser))
  }
}
