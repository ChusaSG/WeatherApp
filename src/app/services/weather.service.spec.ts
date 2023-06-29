import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { WeatherService } from './weather.service';
import { environment } from '../../environments/environment';
import * as moment from 'moment';

describe('WeatherService', () => {
  let service: WeatherService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [WeatherService]
    });
    service = TestBed.inject(WeatherService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should make a GET request to getCurrentWeather API', () => {
    const mockLoc = 'London';
    const expectedUrl = `${environment.apiUrl}/weather?q=${mockLoc}&appid=${environment.apiKey}&lang=${environment.language}`;

    service.getCurrentWeather(mockLoc).subscribe();

    const req = httpMock.expectOne(expectedUrl);
    expect(req.request.method).toBe('GET');
  });

  it('should make a GET request to getForecast API', () => {
    const mockLoc = 'London';
    const startDate = Math.round(+moment(new Date()).subtract(1, 'week').toDate() / 1000);
    const endDate = Math.round(+moment(new Date()).add(1, 'week').toDate() / 1000);
    const expectedUrl = `${environment.apiUrl}/forecast?q=${mockLoc}&start=${startDate}&end=${endDate}&appid=${environment.apiKey}&lang=${environment.language}`;

    service.getForecast(mockLoc).subscribe();

    const req = httpMock.expectOne(expectedUrl);
    expect(req.request.method).toBe('GET');
  });


});
