import {Component, Input} from '@angular/core';
import {Booking} from "../../../shared/data/booking/booking-model";

@Component({
  selector: 'app-meeting-list',
  templateUrl: './meeting-list.component.html',
  styleUrls: ['./meeting-list.component.css']
})
export class MeetingListComponent {

  @Input() filteredBookings: Booking[]

}
