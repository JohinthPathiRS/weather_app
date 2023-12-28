import { HttpClient, HttpHeaders, HttpParams, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../environments/environment.development';
import { weatherData } from '../models/weather.model';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  constructor(private http: HttpClient) { }

  getWeatherData(cityName: string): Observable<weatherData> {
    const headers = new HttpHeaders()
      .set(environment.XRapidAPIHostHeaderName, environment.XRapidAPIHostHeaderValue)
      .set(environment.XRapidAPIKeyHeaderName, environment.XRapidAPIKeyHeaderValue);

    const params = new HttpParams()
      .set('q', cityName)
      .set('units', 'metric')
      .set('mode', 'json');

    return this.http.get<weatherData>(environment.weatherApiBaseUrl, { headers, params })
      .pipe(
        catchError(this.handleError)
      );
  }

  private handleError(error: any): Observable<never> {
    let errorMessage = 'Unknown error occurred!';
    
    if (error instanceof HttpErrorResponse) {
      errorMessage = `Error Status: ${error.status}\nMessage: ${error.message}`;
    } else if (typeof error === 'string') {
      errorMessage = `Error: ${error}`;
    } else {
      errorMessage = `An error occurred: ${JSON.stringify(error)}`;
    }
    
    console.error(errorMessage);
    
    return throwError(() => new Error(errorMessage));
  }
}
