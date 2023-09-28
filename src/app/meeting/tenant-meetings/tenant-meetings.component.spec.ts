import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TenantMeetingsComponent } from './tenant-meetings.component';

describe('PaidMeetingComponent', () => {
  let component: TenantMeetingsComponent;
  let fixture: ComponentFixture<TenantMeetingsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TenantMeetingsComponent]
    });
    fixture = TestBed.createComponent(TenantMeetingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
