export interface Meeting {
  _id?: string,
  dateRange: DateRange,
  desc: string,
  link: string,
  location: string,
  duration: string,
  name: string,
  price: number,
  tenantId: string,
  isFree: boolean
}

interface DateRange {
  start: string,
  end: string
}
