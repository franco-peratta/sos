export type Shifts = {
  monday: {
    available: boolean
    shifts: { from: number; to: number }[]
  }
  tuesday: {
    available: boolean
    shifts: { from: number; to: number }[]
  }
  wednesday: {
    available: boolean
    shifts: { from: number; to: number }[]
  }
  thursday: {
    available: boolean
    shifts: { from: number; to: number }[]
  }
  friday: {
    available: boolean
    shifts: { from: number; to: number }[]
  }
}

export type User = {
  email: string
  shifts: Shifts
  name: string
  phoneNumber: string
  providerId: string
  providerData: []
}
