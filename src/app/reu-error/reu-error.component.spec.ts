import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReuErrorComponent } from './reu-error.component';

describe('ReuErrorComponent', () => {
  let component: ReuErrorComponent;
  let fixture: ComponentFixture<ReuErrorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReuErrorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReuErrorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
