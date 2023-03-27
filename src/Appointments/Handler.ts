import { collection, getDocs } from "firebase/firestore"
import { db } from "../firebase/firestore"
import { http } from "../http"
import {
  Appointment,
  AppointmentStatus,
  AppointmentWithPatientInfo
} from "./Model"

export const getAppointments = async () => {
  const patients = await getDocs(collection(db, "patients"))
  let response: AppointmentWithPatientInfo[] = []
  patients.forEach((doc) => {
    const appointments = doc.data().appointments
    if (!appointments) return

    const appointmentsForPatient = appointments.map(
      (app: AppointmentWithPatientInfo) => ({
        ...app,
        patientId: doc.id,
        patientName: doc.data().name,
        patientEmail: doc.data().email
      })
    )

    response = response.concat(
      appointmentsForPatient.filter(
        (app: AppointmentWithPatientInfo) => app.status !== "terminado"
      )
    )
  })
  return response
}

export const addAppointment = async (
  patientId: string,
  appointment: Appointment
) => {
  return true
}

export const deleteAppointment = async (
  appointment: AppointmentWithPatientInfo
) => {
  const res = await http(`/appointments/${appointment.id}`, {
    method: "DELETE"
  })
  const json = await res.json()
  return json.data
}

export const changeAppointmentStatusById = async (
  appointmentId: string,
  status: AppointmentStatus
) => {
  const res = await http(`/appointments/${appointmentId}`, {
    method: "PATCH"
  })
  const json = await res.json()
  return json.data
}
