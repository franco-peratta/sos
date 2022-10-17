import { doc, getDoc } from "firebase/firestore"
import { db } from "../firebase/firestore"
import { Patient } from "../Patients/model"

export const checkPatientIdAndAppId = async (
  patientId: string,
  appointmentId: string
) => {
  const snap = await getDoc(doc(db, "patients", patientId))
  if (!snap.exists()) throw new Error("Not Found")
  const patient = { ...snap.data(), id: snap.id } as Patient
  const appointment = patient.appointments?.find(
    (app) => app.id === appointmentId
  )
  if (!appointment) throw new Error("Turno invalido")
  if (appointment.status === "terminado") throw new Error("Turno invalido")

  delete patient.appointments

  return { ...patient, appointment }
}
