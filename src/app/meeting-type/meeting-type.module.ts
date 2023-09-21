import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MeetingTypeRoutingModule } from './meeting-type-routing.module';
import { PaidMeetingComponent } from './paid-meeting/paid-meeting.component';
import { MeetingComponent } from './meeting/meeting.component';
import {ReactiveFormsModule} from "@angular/forms";
import {CalendarModule} from "primeng/calendar";
import {ScrollPanelModule} from "primeng/scrollpanel";
import {ProgressSpinnerModule} from "primeng/progressspinner";
import { ScheduledMeetingsComponent } from './scheduled-meetings/scheduled-meetings.component';
import { MeetingListComponent } from './scheduled-meetings/meeting-list/meeting-list.component';
import {CopyClipboardDirective} from "../shared/directives/copy-clipboard-directive";


@NgModule({
    declarations: [
        PaidMeetingComponent,
        MeetingComponent,
        ScheduledMeetingsComponent,
        MeetingListComponent,
        CopyClipboardDirective
    ],
    imports: [
        CommonModule,
        MeetingTypeRoutingModule,
        ReactiveFormsModule,
        CalendarModule,
        ScrollPanelModule,
        ProgressSpinnerModule
    ]
})
export class MeetingTypeModule { }
