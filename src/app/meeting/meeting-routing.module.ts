import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {TenantMeetingsComponent} from "./tenant-meetings/tenant-meetings.component";
import {MeetingComponent} from "./meeting/meeting.component";

const routes: Routes = [
  { path: '', component: MeetingComponent},
  { path: ':username', component: TenantMeetingsComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MeetingRoutingModule { }
