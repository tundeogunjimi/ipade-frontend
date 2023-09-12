import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MeetingTypeRoutingModule } from './meeting-type-routing.module';
import { PaidMeetingComponent } from './paid-meeting/paid-meeting.component';
import { MeetingComponent } from './meeting/meeting.component';
import {ReactiveFormsModule} from "@angular/forms";
import {CalendarModule} from "primeng/calendar";
import {ScrollPanelModule} from "primeng/scrollpanel";


@NgModule({
  declarations: [
    PaidMeetingComponent,
    MeetingComponent
  ],
    imports: [
        CommonModule,
        MeetingTypeRoutingModule,
        ReactiveFormsModule,
        CalendarModule,
        ScrollPanelModule
    ]
})
export class MeetingTypeModule { }
