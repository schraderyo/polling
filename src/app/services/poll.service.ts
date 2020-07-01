import { ROUTES } from '../_constants/routes';
import { HttpClient } from '@angular/common/http';
import { Injectable } from "@angular/core";
import { catchError, map } from "rxjs/operators";
import { HttpErrorResponse } from "@angular/common/http";
import { Poll } from '../_models/polls';

@Injectable()
export class PollService {
    public _activeEvent: any;
    public _eventActive: boolean = false;
    api = ROUTES.API;
    
    constructor(private http: HttpClient) {}
  
    getPolls() {
      const pollsAdapter = new Poll().PollsAdapter;
      return this.http
        .get(this.api + ROUTES.POLLS)
        .pipe(
          map((data: any[]) => pollsAdapter(data), catchError(this.handleError))
        );
    }
  
    getPollById(id: number) {
      const pollAdapter = new Poll().PollAdapter;
      return this.http
        .get(`${this.api}${ROUTES.POLLS}/${id}`)
        .pipe(
          map((data: any) => pollAdapter(data), catchError(this.handleError))
        );
    }
  
    getPollStatsById(id: number) {
      const pollAdapter = new Poll().PollAdapter;
      return this.http
        .get(`${this.api}${ROUTES.POLL_STATUS}/${id}`)
        .pipe(
          map((data: any) => pollAdapter(data), catchError(this.handleError))
        );
    }
  
    getUserPollStatsById(id: number) {
      const pollAdapter = new Poll().PollAdapter;
      return this.http
        .get(`${this.api}${ROUTES.USER_STATUS}/${id}`)
        .pipe(
          map((data: any) => pollAdapter(data), catchError(this.handleError))
        );
    }
  
    addPoll(form: any) {
      return this.http
        .post(this.api + ROUTES.POLLS, form)
        .pipe(catchError(this.handleError));
    }

    addPollStatus(form: any) {
      return this.http
        .post(this.api + ROUTES.STATUS, form)
        .pipe(catchError(this.handleError));
    }
  
    editPoll(form: any, id: number) {
      return this.http
        .put(`${this.api}${ROUTES.POLLS}/${id}`, form)
        .pipe(catchError(this.handleError));
    }

    addPollResponse(form: any, id: number) {
      return this.http
        .put(`${this.api}${ROUTES.RESPONSE}/${id}`, form)
        .pipe(catchError(this.handleError));
    }
  
    deletePoll(id: number) {
      return this.http
        .delete(`${this.api}${ROUTES.POLLS}/${id}`)
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


