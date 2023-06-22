import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { WeatherService } from '../services/weather.service';
import { tap } from 'rxjs/operators';
import { IconsWeatherComponent } from '../icons-weather/icons-weather.component';

@Component({
  selector: 'app-current-weather',
  templateUrl: './current-weather.component.html',
  styleUrls: ['./current-weather.component.scss']
})
export class CurrentWeatherComponent implements OnInit {
  loc$: Observable<string>;
  loc: string | undefined;
  currentWeather: any = {};
  msg: string | undefined;

  constructor(
    private store: Store<any>,
    private weatherService: WeatherService
  ) {
    this.loc$ = store.pipe(select('loc'));
    this.loc$.pipe(
      tap(loc => {
        this.loc = loc;
        this.searchWeather(loc);
      })
    ).subscribe();
  }

  ngOnInit() {
  }

  searchWeather(loc: string) {
    this.msg = '';
    this.currentWeather = {};
    this.weatherService.getCurrentWeather(loc)
      .subscribe(
        res => {
          this.currentWeather = res;
        },
        err => this.handleError(err)
      );
  }

  private handleError(err: any) {
    if (err.error && err.error.message) {
      alert(err.error.message);
      this.msg = err.error.message;
    } else {
      alert('Error al acceder.');
    }
  }

  resultFound() {
    return Object.keys(this.currentWeather).length > 0;
  }
}
