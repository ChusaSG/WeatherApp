import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { WeatherService } from '../services/weather.service';

@Component({
  selector: 'app-forecast',
  templateUrl: './forecast.component.html',
  styleUrls: ['./forecast.component.scss']
})
export class ForecastComponent implements OnInit {
  loc$: Observable<string>;
  loc: string | undefined;
  currentWeather: any = {};
  forecast: any = {};
  uniqueForecast: any[] = [];
  msg: string | undefined;

  constructor(
    private store: Store<any>,
    private weatherService: WeatherService
  ) {
    this.loc$ = store.pipe(select('loc'));
    this.loc$.subscribe(loc => {
      this.loc = loc;
      this.searchWeather(loc);
    });
  }

  ngOnInit() {}

  searchWeather(loc: string) {
    this.msg = '';
    this.currentWeather = {};
    this.weatherService.getCurrentWeather(loc).subscribe(
      res => {
        this.currentWeather = res;
      },
      err => {
        alert('Error al buscar el tiempo.');
      },
      () => {
        this.searchForecast(loc);
      }
    );
  }

  searchForecast(loc: string) {
    this.weatherService.getForecast(loc).subscribe(
      res => {
        this.forecast = res;
        this.uniqueForecast = this.getUniqueDays();
      },
      err => {
        alert('Error al buscar la previsión.');
      }
    );
  }

  getUniqueDays() {
    const uniqueDays: any[] = [];
    const dayMap = new Map<number, boolean>();

    for (const forecastItem of this.forecast.list) {
      const forecastDate = new Date(forecastItem.dt * 1000);
      const dayKey = new Date(
        forecastDate.getFullYear(),
        forecastDate.getMonth(),
        forecastDate.getDate()
      ).getTime();

      if (!dayMap.has(dayKey)) {
        dayMap.set(dayKey, true);
        uniqueDays.push(forecastItem);
      }
    }

    return uniqueDays;
  }

  resultFound() {
    return Object.keys(this.currentWeather).length > 0;
  }
}
