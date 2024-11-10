import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

interface WeatherForecast {
  date: string;
  temperatureC: number;
  summary: string;
  city: string;
}

@Injectable({
  providedIn: 'root',
})
export class WeatherService {
  private apiUrl = 'http://localhost:5079/weatherforecast';

  constructor(private http: HttpClient) {}

  getWeatherForecast(
    pageSize: number,
    page: number,
    city?: string,
    date?: string,
    lang: string = 'pt'
  ): Observable<WeatherForecast[]> {
    let params = new HttpParams()
      .set('pageSize', pageSize.toString())
      .set('page', page.toString())
      .set('lang', lang);

    if (city) {
      params = params.set('city', city);
    }

    if (date) {
      params = params.set('date', date);
    }

    return this.http.get<WeatherForecast[]>(this.apiUrl, { params });
  }
}
