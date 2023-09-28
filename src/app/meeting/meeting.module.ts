import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MeetingRoutingModule } from './meeting-routing.module';
import { TenantMeetingsComponent } from './tenant-meetings/tenant-meetings.component';
import { MeetingComponent } from './meeting/meeting.component';
import {ReactiveFormsModule} from "@angular/forms";
import {CalendarModule} from "primeng/calendar";
import {ScrollPanelModule} from "primeng/scrollpanel";
import {ProgressSpinnerModule} from "primeng/progressspinner";
import { ScheduledMeetingsComponent } from './scheduled-meetings/scheduled-meetings.component';
import { MeetingListComponent } from './scheduled-meetings/meeting-list/meeting-list.component';
import {CopyClipboardDirective} from "../shared/directives/copy-clipboard-directive";
import {TableModule} from "primeng/table";


@NgModule({
    declarations: [
        TenantMeetingsComponent,
        MeetingComponent,
        ScheduledMeetingsComponent,
        MeetingListComponent,
        CopyClipboardDirective
    ],
  imports: [
    CommonModule,
    MeetingRoutingModule,
    ReactiveFormsModule,
    CalendarModule,
    ScrollPanelModule,
    ProgressSpinnerModule,
    TableModule
  ]
})
export class MeetingModule { }
