import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {AuthService} from "../../auth/auth.service";
import {User} from "../../shared/data/auth/user-model";
import {FormBuilder, FormGroup} from "@angular/forms";
import {Meeting} from "../../shared/data/meeting/meeting";
import {MeetingService} from "../meeting.service";
import {pipe, take} from "rxjs";
import {MessageService} from "primeng/api";

@Component({
  selector: 'app-meeting',
  templateUrl: './meeting.component.html',
  styleUrls: ['./meeting.component.css']
})
export class MeetingComponent implements OnInit{

  public currentUser: User;
  public meetingType: string = 'paid'
  private username: string
  public meetingForm: FormGroup
  public formErrors: FormError
  public meetings: Meeting[]
  public selectedMeeting: Meeting
  public saveButtonTxt: string = 'save'
  public isMeetingFetched: boolean = false
  public shouldShowAddressField: boolean = false
  public locations = [
    { name: 'In Person', value: 'in-person'},
    { name: 'Online', value: 'online'},
  ]

  constructor(
    private authService: AuthService,
    private meetingService: MeetingService,
    private messageService: MessageService,
    private fb: FormBuilder,
    private cdr: ChangeDetectorRef,
  ) {
  }

  ngOnInit(): void {
    this.fetchUserDetails()
    this.createMeetingForm()
    this.initializeFormErrors()
  }

  getMeetings(tenantId: string): void {
    this.meetings = []
    this.meetingService.getMeetings(tenantId)
      .pipe(take(1))
      .subscribe({
        next: (res) => {
          this.meetings = res
          this.isMeetingFetched = true;
        },
        error: (e) => {
          console.log(`error from backend >>>`, e.error.message)
          this.isMeetingFetched = true;
        }
      })
  }

  initializeFormErrors() {
    this.formErrors = {
      dateRange: "", desc: "", duration: "", isFree: "", link: "", location: "", name: "", price: "", tenantId: "", address: ""
    }
  }

  createMeetingForm(): void {
    this.meetingForm = this.fb.group({
      name: [''],
      duration: [''],
      location: [''],
      address: [''],
      dateRange: [''],
      price: [''],
      desc: [''],
      link: ['']
    })
  }

  fetchUserDetails() {
    this.authService.fetchUserDetails()
      .subscribe({
        next: (user) => {
          this.currentUser = user
          this.getMeetings(this.currentUser.id)
          this.username = user.name.split(" ").join("-")
        },
        error: (e) => {
          console.log(e)
          // this.router.navigate(['/login'])
        }
      })
  }
  selectMeeting(meeting: Meeting) {
    this.selectedMeeting = meeting
    const dateRange = [new Date(meeting.dateRange.start), new Date(meeting.dateRange.end)]
    this.meetingForm.patchValue({
      ...meeting,
      dateRange
    })
    this.saveButtonTxt = 'Update'
    console.log(`selected event`, meeting)
  }

  createUrl() {
    const meetingName = ((this.meetingForm.getRawValue().name).split(" ").join("-")).trim()
    const link = (`/${this.username}/${meetingName}`).toLowerCase()
    this.meetingForm.patchValue({
      link
    })
    console.log(`create url >>>`, link)
  }

  createMeeting(): void {
    const formValues = this.meetingForm.getRawValue()

    const dateRange = {
      start: formValues.dateRange[0],
      end: formValues.dateRange[1]
    }

    const meeting: Meeting = {
      dateRange: dateRange,
      desc: formValues.desc,
      link: formValues.link,
      location: formValues.location,
      address: formValues.address,
      duration: formValues.duration,
      name: formValues.name,
      price: formValues.price,
      tenantId: this.currentUser.id,
      isFree: false,
    }

    this.meetingService.createMeeting(meeting)
      .pipe(take(1))
      .subscribe({
        next: (res) => {
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: 'New Message successfully created.'
          })
          this.meetingForm.reset()
          this.getMeetings(this.currentUser.id)
        },
        error: (e) => {
          this.messageService.add({
            severity: 'error',
            summary: 'Meeting creation failed',
            detail: e.error.message
          })
          this.formErrors = e.error
          console.log(`meeting creation failed`, e.error.message)
        }
      })
    console.log(`meeting to create`, meeting)
  }

  updateMeeting() {
    const formValues = this.meetingForm.getRawValue()
    const dateRange = {
      start: formValues.dateRange[0],
      end: formValues.dateRange[1]
    }
    const meetingToUpdate: Meeting = {
      ...formValues,
      dateRange,
      tenantId: this.selectedMeeting?.tenantId
    }
    this.meetingService.updateMeeting(meetingToUpdate, this.selectedMeeting?._id, this.currentUser.id)
      .pipe(take(1))
      .subscribe({
        next: (res) => {
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: 'Meeting successfully updated.'
          })
          this.meetings = []
          this.getMeetings(this.currentUser.id)
          this.meetingForm.reset()
          this.cdr.detectChanges()
        },
        error: (e) => {
          this.messageService.add({
            severity: 'error',
            summary: 'Meeting update failed',
            detail: e.error.message
          })
          this.formErrors = e.error
          console.log(`meeting update failed`, e.error.message)
        }
      })
  }

  clearError(errorName: string): void {
    this.formErrors[errorName] = '';
    console.log(`form errors >>> `, this.formErrors, this.formErrors[errorName])
  }

  saveMeeting(): void {
    if (this.saveButtonTxt === 'save') {
      this.createMeeting();
    } else {
      this.updateMeeting();
    }
  }

  prepareForDelete(meeting: Meeting): void {
    this.selectedMeeting = meeting
  }

  deleteMeeting(): void {
    this.meetingService.deleteMeeting(this.selectedMeeting._id)
      .pipe(take(1))
      .subscribe({
        next: (res) => {
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: 'Meeting successfully deleted.'
          })
          this.getMeetings(this.currentUser.id)
        },
        error: (e) => {
          this.messageService.add({
            severity: 'error',
            summary: 'Could not delete',
            detail: e.error.message
          })
          this.formErrors = e.error
          console.log(`meeting delete failed`, e.error.message)
        }
      })
  }

  checkLocationValue() {
    const location = this.meetingForm.getRawValue().location
    this.shouldShowAddressField = location === 'in-person';
  }
}

interface FormError {
  dateRange: string,
  desc: string,
  link: string,
  location: string,
  address?: string,
  name: string,
  price: string,
  tenantId: string,
  isFree: string
  duration: string
}
