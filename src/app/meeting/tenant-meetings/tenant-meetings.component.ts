import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {MeetingService} from "../meeting.service";
import {take} from "rxjs";
import {Meeting} from "../../shared/data/meeting/meeting";

@Component({
  selector: 'app-tenant-meetings',
  templateUrl: './tenant-meetings.component.html',
  styleUrls: ['./tenant-meetings.component.css']
})
export class TenantMeetingsComponent implements OnInit {

  public meetings: Meeting[]
  public baseUrl: string = `http://localhost:4200/booking/new`

  constructor(
    private activatedRoute: ActivatedRoute,
    private meetingService: MeetingService,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    const tenant_username = this.activatedRoute.snapshot.params['username'];
    console.log(`tenant_username >>> `, tenant_username);
    this.meetingService.getMeetingsByUsername(tenant_username)
      .pipe(take(1))
      .subscribe({
        next: (meetings) => {
          this.meetings = meetings
          console.log(`meetings >>> `, meetings)
        }
      })
  }


  gotoMeeting(meeting: Meeting) {
    this.router.navigate([`/booking/new/${meeting.link}`],
      { queryParams: { meetingId: meeting._id, tenantId: meeting.tenantId }})

    console.log(meeting)
  }
}
