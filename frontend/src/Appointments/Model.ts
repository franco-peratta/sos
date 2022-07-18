import { Moment } from "moment"
import { Patient } from "../Patients/model"

export type Appointment = {
  id: string
  date: Moment
  patient: Patient
  providerId: string
  status: AppointmentStatus
  reasons?: string
}

export type AppointmentStatus = "pendiente" | "actual" | "terminado"

export const statusColorMapping = {
  pendiente: "blue",
  actual: "green",
  terminado: "red"
}
