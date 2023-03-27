export type Appointment = {
  id: string
  date: string
  time: string
  providerId: string
  patientId: string
  status: AppointmentStatus
}

export type AppointmentWithPatientInfo = Appointment & {
  patientId: string
  patientName?: string
  patientEmail?: string
  patientEmr?: []
}

export const APPOINTMENT_STATUS = {
  espera: "espera",
  "en progreso": "en progreso",
  terminado: "terminado"
} as const
export type AppointmentStatus =
  (typeof APPOINTMENT_STATUS)[keyof typeof APPOINTMENT_STATUS]

export const statusColorMapping = {
  espera: "blue",
  "en progreso": "green",
  terminado: "red"
}
