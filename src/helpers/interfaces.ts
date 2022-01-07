export interface Loan {
  id?: string,
  name: string,
  is_complete?: boolean,
  created_at?: string,
  portion: number,
  total_amount: number,
  month_day: string,
  user_id: string,
  remainder?: number,
  transactions?: Transaction[]
}

export interface Transaction {
  id?: string,
  created_at?: string,
  amount: number,
  name: string,
  loan_id: string,
  user_id?: string
}