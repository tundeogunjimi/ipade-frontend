import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {PaidMeetingComponent} from "./paid-meeting/paid-meeting.component";
import {MeetingComponent} from "./meeting/meeting.component";

const routes: Routes = [
  { path: '', component: MeetingComponent},
  { path: 'paid', component: PaidMeetingComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MeetingTypeRoutingModule { }
