export interface Meeting {
  _id?: string,
  dateRange: DateRange,
  desc: string,
  link: string,
  location: string,
  address?: string,
  duration: string,
  name: string,
  price: number,
  resumptionTime: string,
  closingTime: string,
  tenantId: string,
  isFree: boolean
}

interface DateRange {
  start: string,
  end: string
}
