import { Provider } from "../Profile/Model"
import { http } from "../http"
import { Appointment, AppointmentStatus } from "./model"

export const getAppointments = async () => {
  return http<Appointment[]>("GET", "/appointment")
}

export const getAppointmentById = async (id: string) => {
  return http<Appointment>("GET", `/appointment/${id}`)
}

export const getAppointmentsByPatientId = async (id: string) => {
  return http<Appointment[]>("GET", `/appointment/patient/${id}`)
}

export const getAppointmentsByProviderId = async (id: string) => {
  return http<Appointment[]>("GET", `/appointment/provider/${id}`)
}

export const getProvidersList = async () => {
  return http<Provider[]>("GET", `/provider`)
}

export const addAppointment = async (appointment: Omit<Appointment, "id">) => {
  return http<Appointment>("POST", "/appointment/", {
    params: appointment
  })
}

// export const deleteAppointment = async (
//   appointment: AppointmentWithPatientInfo
// ) => {
//   return true
// }

export const changeAppointmentStatusById = async (
  appointmentId: string,
  status: AppointmentStatus
) => {
  return true
}
