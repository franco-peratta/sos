import { collection, getDocs, addDoc } from "firebase/firestore"
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

export const addPatient = (patient: Patient) => {
  return addDoc(collection(db, "patients"), patient)
}
