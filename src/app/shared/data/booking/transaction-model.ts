export interface Transaction {
  amount: number,
  booking_id: string,
  createdAt: string,
  currency: string
  customer: Customer,
  customizations: Customization,
  meta: Meta,
  payment_link: PaymentLink,
  payment_status: PaymentStatus,
  redirect_url: string,
  tx_ref: string,
  updatedAt?: string,
  v?: string,
  _id?: string
}

interface Customer {
  name: string,
  email: string,
  phonenumber: string
}

interface Customization {
  logo: string,
  title: string
}

interface Meta {
  consumer_id: number,
  consumer_mac: string
}

interface PaymentLink {
  data: {
    link: string
  },
  message: string,
  status: string
}

interface PaymentStatus {
  status: string,
  transaction_id: string
}
