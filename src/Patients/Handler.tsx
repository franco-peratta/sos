import { collection, getDocs, addDoc, doc, getDoc } from "firebase/firestore"
import { db } from "../firebase/firestore"
import { Patient } from "./model"

export const getPatients = async () => {
  const querySnapshot = await getDocs(collection(db, "patients"))
  const response: any[] = []
  querySnapshot.forEach((doc) => {
    response.push({ id: doc.id, ...doc.data() })
  })

  return response
}

export const getPatientById = async (id: string) => {
  const snap = await getDoc(doc(db, "patients", id))
  if (!snap.data()) return null
  return { id: snap.id, ...snap.data() } as Patient
}

export const addPatient = (patient: Patient) => {
  console.log(patient)
  return addDoc(collection(db, "patients"), { ...patient, appointments: [] })
}
