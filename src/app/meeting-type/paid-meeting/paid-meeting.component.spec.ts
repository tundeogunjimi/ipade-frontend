import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaidMeetingComponent } from './paid-meeting.component';

describe('PaidMeetingComponent', () => {
  let component: PaidMeetingComponent;
  let fixture: ComponentFixture<PaidMeetingComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PaidMeetingComponent]
    });
    fixture = TestBed.createComponent(PaidMeetingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
