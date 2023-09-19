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

  // Testing................................................................
  requests$ = this.httpClient
      .get<any>('http:4001//www.try.com/accountOpening/getRequest')
      .pipe(
        tap((data) => console.log('fetched hero' + JSON.stringify(data))),
        catchError(this.handleError)
      );



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

  private handleError(err: any, caught: Observable<any>): Observable<any> {
    throw new Error('error occur in the api...');
  }
}
