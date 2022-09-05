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

  if (snap.exists()) {
    console.log(snap.data())
    return snap.data() as Patient
  } else {
    console.log("No such document")
    return null
  }

  // const patientsRef = collection(db, "patients")
  // const q = query(patientsRef, where("id", "==", id))

  // const querySnapshot = await getDocs(q)
  // querySnapshot.forEach((doc) => {
  //   // doc.data() is never undefined for query doc snapshots
  //   console.log(doc.id, " => ", doc.data())
  // })
}

export const addPatient = (patient: Patient) => {
  return addDoc(collection(db, "patients"), patient)
}
