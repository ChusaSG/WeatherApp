import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { StoreModule, Store } from '@ngrx/store';
import { Observable, of, Subject } from 'rxjs';

import { ForecastComponent } from './forecast.component';
import { WeatherService } from '../services/weather.service';

describe('ForecastComponent', () => {
  let component: ForecastComponent;
  let fixture: ComponentFixture<ForecastComponent>;
  let store: Store<any>;
  let weatherService: WeatherService;
  let locSubject: Subject<string>;

  const currentWeatherMock = {
    name: 'Madrid',
    main: {
      temp: 298.48,
      feels_like: 298.74,
      temp_min: 297.56,
      temp_max: 300.05,
      pressure: 1015,
      humidity: 64,
      sea_level: 1015,
      grnd_level: 933
    },
    cod: 200
  };

  const forecastMock = {
    list: [
      {
        dt: 1645132800,
        main: {
          temp: 298.48,
          temp_min: 38.72,
          temp_max: 41.89
        }
      }
    ],
    cod: 200
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ForecastComponent],
      imports: [HttpClientModule, StoreModule.forRoot({})],
      providers: [WeatherService]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ForecastComponent);
    component = fixture.componentInstance;
    store = TestBed.inject(Store);
    weatherService = TestBed.inject(WeatherService);
    locSubject = new Subject<string>();

    spyOn(store, 'pipe').and.returnValue(of(locSubject.asObservable()));
    spyOn(weatherService, 'getCurrentWeather').and.callFake((loc: string) => {
      expect(loc).toBe('Madrid');
      return of(currentWeatherMock);
    });
    spyOn(weatherService, 'getForecast').and.returnValue(of(forecastMock));

    fixture.detectChanges();
  });

  it('should create the forecast component', () => {
    expect(component).toBeTruthy();
  });

  it('should call getCurrentWeather and getForecast when loc$ emits a value', () => {
    locSubject.next('Madrid');
    expect(weatherService.getCurrentWeather).toHaveBeenCalledWith('Madrid');
    expect(weatherService.getForecast).toHaveBeenCalledWith('Madrid');
  });

  it('should populate currentWeather and forecast properties after calling getCurrentWeather and getForecast', () => {
    locSubject.next('Madrid');
    expect(component.currentWeather).toEqual(currentWeatherMock);
    expect(component.forecast).toEqual(forecastMock);
  });
});
