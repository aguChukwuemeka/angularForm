import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, throwError, of, tap } from 'rxjs';
import { AppConfigService } from '../config/appConfig.service';

@Injectable({
  providedIn: 'root',
})
export class FormAppService {
  apiBaseUrl: string;
  headers: HttpHeaders;

  constructor(private httpClient: HttpClient, settings: AppConfigService) {
    this.apiBaseUrl = settings.AdditionalAccountUrl;
    this.headers = new HttpHeaders({
      'X-Stack-Eb': 'djjddd8991B2c3D4e5F6g7H8',
      'Content-Type': 'application/json',
    });
  }

  submitRequest(payload: any): Observable<any> {
    return this.httpClient.post<any>(
      `${this.apiBaseUrl}/CustomerRequest/accountOpening/submitRequest`,
      payload,
      { headers: this.headers }
    );
  }

  //testing...
  getRequest(payload: any): Observable<any> {
    if (true === payload) {
      return of(this.initialRequest());
    }
    return this.httpClient
      .post<any>(
        `${this.apiBaseUrl}/CustomerRequest/accountOpening/submitRequest`,
        payload,
        { headers: this.headers }
      )
      .pipe(
        tap((data) => console.log('fetched hero' + JSON.stringify(data))),
        catchError(this.handleError)
      );
  }

  initialRequest() {
    return {
      id: 0,
      result: null,
      product: '',
      loading: false,
      examine: null,
      cash: null,
    };
  }

  private handleError(err: any, caught: Observable<any>): Observable<any> {
    throw new Error('Function not implemented.');
  }
}
