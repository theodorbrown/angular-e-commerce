import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PhoneWidgetComponent } from './phone-widget.component';

describe('PhoneWidgetComponent', () => {
  let component: PhoneWidgetComponent;
  let fixture: ComponentFixture<PhoneWidgetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PhoneWidgetComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PhoneWidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
