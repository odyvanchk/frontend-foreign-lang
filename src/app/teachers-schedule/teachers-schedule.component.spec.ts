import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeachersScheduleComponent } from './teachers-schedule.component';

describe('TeachersScheduleComponent', () => {
  let component: TeachersScheduleComponent;
  let fixture: ComponentFixture<TeachersScheduleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TeachersScheduleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TeachersScheduleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
