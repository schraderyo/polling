import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from 'rxjs';
import { ROUTES } from '../_constants/routes';

const TOKEN = "TOKEN";

@Injectable({providedIn: 'root'})
export class AuthService {
  api = ROUTES.API;
  username: string;
  
  constructor(private http: HttpClient) {}

  login(email: string, password: string): Observable<any> {
    return this.http.post<any>(this.api + ROUTES.LOGIN, {
      email: email,
      password: password
    });
  }

  setToken(token: string): void {
    localStorage.setItem(TOKEN, token);
  }

  /**
   * Validate the user as logged in if token exists to bypass gaurd
   */
  isLogged() {
    return localStorage.getItem(TOKEN) != null;
  }

  /**
   * Remove login token from local storage
   */
  logout() {
    localStorage.removeItem(TOKEN);
  }

  /**
   * Set the username of logged in user
   * @param name
   */
  setUsername(name: string): void {
    this.username = name;
  }
}