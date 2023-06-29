import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { WeatherService } from '../services/weather.service';

describe('WeatherService', () => {
  let service: WeatherService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [WeatherService]
    });
    service = TestBed.inject(WeatherService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get current weather', () => {
    // Prueba el método getCurrentWeather()
    const loc = 'London';
    const result = service.getCurrentWeather(loc);

  });

  it('should get forecast', () => {
    // Prueba el método getForecast()
    const loc = 'London';
    const result = service.getForecast(loc);

  });
});
