import { collection, getDocs, doc, setDoc, getDoc } from "firebase/firestore"
import { db } from "../firebase/firestore"
import { getPatientById } from "../Patients/Handler"
import { Patient } from "../Patients/model"
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
  const patient = await getPatientById(patientId)

  if (!patient) return

  if (patient.appointments) {
    patient.appointments = [...patient.appointments, appointment]
  } else {
    patient.appointments = [appointment]
  }

  return setDoc(doc(db, "patients", patientId), patient)

  //@TODO add it to provider's list of appointments as well
}

export const deleteAppointment = async (
  appointment: AppointmentWithPatientInfo
) => {
  const patient = await getPatientById(appointment.patientId)
  if (!patient) return

  if (!patient.appointments) {
    return null
  }

  patient.appointments = patient.appointments.filter(
    (app) => app.id !== appointment.id
  )

  return setDoc(doc(db, "patients", patient.id), patient)

  //@TODO remove it from provider's list of appointments as well
}

export const changeAppointmentStatus = async (
  appointment: AppointmentWithPatientInfo,
  status: AppointmentStatus
) => {
  const snap = await getDoc(doc(db, "patients", appointment.patientId))
  if (!snap.exists()) throw new Error("Paciente no encontrado")

  const patient = { id: snap.id, ...snap.data() } as Patient

  const index = patient.appointments!.findIndex((a) => a.id === appointment.id)
  if (index < 0) throw new Error("Turno invalido")

  patient.appointments![index] = {
    id: appointment.id,
    date: appointment.date,
    providerId: appointment.providerId,
    time: appointment.time,
    status
  }

  return setDoc(doc(db, "patients", appointment.patientId), patient)
}

export const changeAppointmentStatusById = async (
  patientId: string,
  appointmentId: string,
  status: AppointmentStatus
) => {
  const snap = await getDoc(doc(db, "patients", patientId))
  if (!snap.exists()) throw new Error("Paciente no encontrado")

  const patient = { id: snap.id, ...snap.data() } as Patient

  const index = patient.appointments!.findIndex((a) => a.id === appointmentId)
  if (index < 0) throw new Error("Turno invalido")

  patient.appointments![index] = {
    id: appointmentId,
    date: patient.appointments![index].date,
    providerId: patient.appointments![index].providerId,
    time: patient.appointments![index].time,
    status
  }

  return setDoc(doc(db, "patients", patientId), patient)
}
