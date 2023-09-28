export interface Booking {
  id?: string,
  name: string,
  email: string,
  gender?: string,
  mobile?: string,
  date: Date,
  time: string,
  status?: string,
  purpose?: string,
  message: string,
  tenantId: string,
  completed: boolean,
  meetingType: string,
  location?: string,
  extras?: {
    queryParams: {
      bookingId: string,
      meetingId: string,
      tenantId: string,
    },
    tenantUrl: string
  }
}
