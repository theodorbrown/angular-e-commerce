import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ToggleProfileInfoComponent } from './toggle-profile-info.component';

describe('ToggleProfileInfoComponent', () => {
  let component: ToggleProfileInfoComponent;
  let fixture: ComponentFixture<ToggleProfileInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ToggleProfileInfoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ToggleProfileInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
