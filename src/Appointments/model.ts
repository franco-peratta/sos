export const Status = {
  espera: "espera",
  en_progreso: "en_progreso",
  terminado: "terminado",
  cancelado: "cancelado"
} as const

type TStatus = (typeof Status)[keyof typeof Status]

export type Appointment = {
  id: number
  status: TStatus
  date: Date
  time: string
  patientId: number
  providerId: number
}

export const statusColorMapping = {
  espera: "blue",
  en_progreso: "yellow",
  terminado: "green",
  cancelado: "red"
}
