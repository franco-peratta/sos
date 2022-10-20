import { doc, getDoc, setDoc } from "firebase/firestore"
import { db } from "../firebase/firestore"
import { Patient } from "../Patients/model"
import { EmrType } from "./model"

export const getEMR = async (id: string) => {
  const snap = await getDoc(doc(db, "patients", id))
  const patient = snap.data() as Patient

  return patient.emr
}

export const setEMR = async (patientId: string, newEmr: EmrType) => {
  const patientRef = await getDoc(doc(db, "patients", patientId))

  const patient = { id: patientId, ...patientRef.data(), emr: newEmr }
  await setDoc(doc(db, "patients", patientId), patient)

  return newEmr
}
