import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScheduledMeetingsComponent } from './scheduled-meetings.component';

describe('ScheduledMeetingsComponent', () => {
  let component: ScheduledMeetingsComponent;
  let fixture: ComponentFixture<ScheduledMeetingsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ScheduledMeetingsComponent]
    });
    fixture = TestBed.createComponent(ScheduledMeetingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
