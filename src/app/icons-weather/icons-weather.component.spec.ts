import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IconsWeatherComponent } from './icons-weather.component';

describe('IconsWeatherComponent', () => {
  let component: IconsWeatherComponent;
  let fixture: ComponentFixture<IconsWeatherComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [IconsWeatherComponent]
    });
    fixture = TestBed.createComponent(IconsWeatherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
