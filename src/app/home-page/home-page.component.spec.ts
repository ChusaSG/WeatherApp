import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HomePageComponent } from './home-page.component';
import { Store, StoreModule } from '@ngrx/store';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { of } from 'rxjs';

describe('HomePageComponent', () => {
  let component: HomePageComponent;
  let fixture: ComponentFixture<HomePageComponent>;
  let store: MockStore<any>;

  const initialState = {
    loc: 'Barcelona' // Estado inicial para la localización
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomePageComponent],
      imports: [
        StoreModule.forRoot({})
      ],
      providers: [
        provideMockStore({ initialState })
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomePageComponent);
    component = fixture.componentInstance;
    store = TestBed.inject(Store) as MockStore<any>;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should subscribe to the store and update loc variable', () => {
    const mockLoc = 'Madrid';
    const mockLoc$ = of(mockLoc);

    store.overrideSelector('loc', mockLoc$);
    fixture.detectChanges();

    expect(component.loc).toBe(mockLoc);
  });
});
