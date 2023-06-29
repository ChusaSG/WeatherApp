import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, NgForm } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { Store, StoreModule, Action } from '@ngrx/store';
import { MatToolbarModule } from '@angular/material/toolbar';
import { TopBarComponent } from './top-bar.component';
import { SET_LOCATION } from '../location-reducer';

describe('TopBarComponent', () => {
  let component: TopBarComponent;
  let fixture: ComponentFixture<TopBarComponent>;
  let store: Store<any>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TopBarComponent],
      imports: [FormsModule, StoreModule.forRoot({}), MatToolbarModule]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TopBarComponent);
    component = fixture.componentInstance;
    store = TestBed.inject(Store);
  });

  it('should create the top bar component', () => {
    expect(component).toBeTruthy();
  });

  it('should dispatch SET_LOCATION action on form submission', () => {
    const dispatchSpy = spyOn(store, 'dispatch');
    const searchForm = fixture.debugElement.query(By.css('form')).nativeElement as HTMLFormElement;
    const location = 'London';
    component.loc = location;

    fixture.detectChanges();
    searchForm.dispatchEvent(new Event('submit'));
    fixture.detectChanges();

    expect(dispatchSpy).toHaveBeenCalledWith({ type: SET_LOCATION, payload: location } as Action);
  });

  it('should not dispatch SET_LOCATION action on form submission if form is invalid', () => {
    const dispatchSpy = spyOn(store, 'dispatch');
    const searchForm = fixture.debugElement.query(By.css('form')).nativeElement as HTMLFormElement;

    fixture.detectChanges();
    searchForm.dispatchEvent(new Event('submit'));
    fixture.detectChanges();

    expect(dispatchSpy).not.toHaveBeenCalledWith({ type: SET_LOCATION } as Action);
  });
});
