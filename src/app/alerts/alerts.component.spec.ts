import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AlertsComponent } from './alerts.component';
import { Store, StoreModule } from '@ngrx/store';
import { MockStore, provideMockStore } from '@ngrx/store/testing';

describe('AlertsComponent', () => {
  let component: AlertsComponent;
  let fixture: ComponentFixture<AlertsComponent>;
  let store: MockStore<any>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AlertsComponent],
      imports: [StoreModule.forRoot({})],
      providers: [provideMockStore()]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AlertsComponent);
    component = fixture.componentInstance;
    store = TestBed.inject(Store) as MockStore<any>;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize loc$ observable with the value from the store', () => {
    const mockLoc = 'London';
    store.setState({ loc: mockLoc });
    fixture.detectChanges();
    component.loc$.subscribe(loc => {
      expect(loc).toEqual(mockLoc);
    });
  });


});
