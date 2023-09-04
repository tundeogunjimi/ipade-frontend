export interface Booking {
  name: string,
  email: string,
  gender: string,
  mobile: string,
  appointmentDate: Date,
  appointmentTime: string,
  status: string,
  purpose: string,
  message: string,
  tenantId: string,
  completed: boolean,
  meetingType: string
}
