import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { ROUTES } from '../_constants/routes';
import { User } from '../_models/user';
import { catchError, map } from "rxjs/operators";

const TOKEN = 'TOKEN';

@Injectable({providedIn: 'root'})
export class UserService {
  api = ROUTES.API;
  constructor(private http: HttpClient) {}

  isLogged() {
    return localStorage.getItem(TOKEN) != null;
  }

  getUsers() {
    const usersAdapter = new User().UsersAdapter;
    return this.http
      .get(this.api + ROUTES.USERS)
      .pipe(
        map((data: any[]) => usersAdapter(data), catchError(this.handleError))
      );
  }

  getUserById(id: number) {
    const userAdapter = new User().UserAdapter;
    return this.http
      .get(`${this.api}${ROUTES.USERS}/${id}`)
      .pipe(
        map((data: any) => userAdapter(data), catchError(this.handleError))
      );
  }

  getUsersById(id: number[]) {
    const userAdapter = new User().UserAdapter;
    return this.http
      .get(`${this.api}${ROUTES.USERS}/${id}`)
      .pipe(
        map((data: any) => userAdapter(data), catchError(this.handleError))
      );
  }

  addUser(memberForm: any) {
    return this.http
      .post(this.api + ROUTES.USERS, memberForm)
      .pipe(catchError(this.handleError));
  }

  editUser(memberForm: any, id: number) {
    return this.http
      .put(`${this.api}${ROUTES.USERS}/${id}`, memberForm)
      .pipe(catchError(this.handleError));
  }

  deleteUser(id: number) {
    return this.http
      .delete(`${this.api}${ROUTES.USERS}/${id}`)
      .pipe(catchError(this.handleError));
  }

  /**
   * Return error message if occurs
   * @param error
   */
  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error("An error occurred:", error.error.message);
    } else {
      console.error(
        `Backend returned code ${error.status}, ` + `body was: ${error.error}`
      );
    }
    return [];
  }
}