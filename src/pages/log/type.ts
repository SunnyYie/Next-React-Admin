export type InterfaceLog = {
  id: string
  method: string
  url: string

  params?: string
  status?: number
  userAgent?: string
  referrer?: string
  os?: string
  userId?: string
  ip?: string

  createdAt?: string
}
