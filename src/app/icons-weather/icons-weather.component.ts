import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-icons-weather',
  templateUrl: './icons-weather.component.html',
  styleUrls: ['./icons-weather.component.scss']
})
export class IconsWeatherComponent implements OnInit {

  public icon = 'weather';
  public _id = 0;

  @Input() set currentWeather(value: any) {
    if (value && value.weather && value.weather.length > 0) {
      this._id = value.weather[0].id;
      this.icon = this.getWeatherIcon(this._id);
    }
  }

  constructor() { }

  ngOnInit(): void {
  }

  getWeatherIcon(id: number): string {
    if (id >= 200 && id <= 250) {
      return "thunder";
    } else if (id >= 300 && id <= 350) {
      return "rainy-4";
    } else if (id >= 500 && id <= 550) {
      return "rainy-7";
    } else if (id == 600) {
      return "snowy-1";
    } else if (id == 601) {
      return "snowy-2";
    } else if (id > 601 && id <= 650) {
      return "snowy-6";
    } else if (id == 800) {
      return "day";
    } else if (id == 801) {
      return "cloudy-day-1";
    } else if (id == 802) {
      return "cloudy-day-2";
    } else if (id > 802) {
      return "cloudy-day-3";
    } else {
      return "weather";
    }
  }
}
