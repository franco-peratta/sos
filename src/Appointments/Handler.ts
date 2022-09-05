import { collection, getDocs, doc, setDoc } from "firebase/firestore"
import { db } from "../firebase/firestore"
import { getPatientById } from "../Patients/Handler"
import { Appointment, AppointmentWithPatientInfo } from "./Model"

export const getAppointments = async () => {
  const patients = await getDocs(collection(db, "patients"))
  let response: AppointmentWithPatientInfo[] = []
  patients.forEach((doc) => {
    const appointmentsForPatient = doc
      .data()
      .appointments.map((app: AppointmentWithPatientInfo) => ({
        ...app,
        patientId: doc.id,
        patientName: doc.data().name,
        patientEmail: doc.data().email
      }))
    response = response.concat(appointmentsForPatient)
  })

  return response
}

// export const getAppointmentById = async (id: string) => {
// const snap = await getDoc(doc(db, "patients", id))
// return { id: snap.id, ...snap.data() } as Patient
// }

export const addAppointment = async (
  patientId: string,
  appointment: Appointment
) => {
  const patient = await getPatientById(patientId)

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

  if (!patient.appointments) {
    return null
  }

  patient.appointments = patient.appointments.filter(
    (app) => app.id !== appointment.id
  )

  return setDoc(doc(db, "patients", patient.id), patient)

  //@TODO remove it from provider's list of appointments as well
}
