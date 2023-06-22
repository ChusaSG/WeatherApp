import { Injectable, isDevMode } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import * as moment from 'moment';

const apiKey: string = environment.apiKey;
const language: string = environment.language;

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  constructor(private http: HttpClient) { }

  getCurrentWeather(loc: string) {
    return this.http.get(`${environment.apiUrl}/weather?q=${loc}&appid=${apiKey}&lang=${language}`)
  }

  getForecast(loc: string) {
    const startDate = Math.round(+moment(new Date()).subtract(1, 'week').toDate() / 1000);
    const endDate = Math.round(+moment(new Date()).add(1, 'week').toDate() / 1000);
    return this.http.get(`${environment.apiUrl}/forecast?q=${loc}&start=${startDate}&end=${endDate}&appid=${apiKey}&lang=${language}`)
  }

  getUv(lat: number, lon: number) {
    const startDate = Math.round(+moment(new Date()).subtract(1, 'week').toDate() / 1000);
    const endDate = Math.round(+moment(new Date()).add(1, 'week').toDate() / 1000);
    return this.http.get(`${environment.apiUrl}/uvi/history?lat=${lat}&lon=${lon}&start=${startDate}&end=${endDate}&appid=${apiKey}`)
  }
}
