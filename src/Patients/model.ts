import { Appointment } from "../Appointments/Model"

export type Patient = {
  id: string
  name: string
  dni: string
  dob: string
  email: string
}

export type PatientWithAppointment = {
  id: string
  name: string
  dni: string
  dob: string
  email: string
  Appointment: Appointment[]
}
