export type Appointment = {
  id: string
  date: string
  time: string
  providerId: string
  status: AppointmentStatus
  reasons?: string
}

export type AppointmentWithPatientInfo = Appointment & {
  patientId: string
  patientName?: string
  patientEmail?: string
  patientEmr?: []
}

// export type AppointmentStatus = "pendiente" | "en progreso" | "terminado"
export const APPOINTMENT_STATUS = {
  pendiente: "pendiente",
  "en progreso": "en progreso",
  terminado: "terminado"
} as const
export type AppointmentStatus =
  typeof APPOINTMENT_STATUS[keyof typeof APPOINTMENT_STATUS]

export const statusColorMapping = {
  pendiente: "blue",
  "en progreso": "green",
  terminado: "red"
}
