import { doc, getDoc, setDoc } from "firebase/firestore"
import { db } from "../firebase/firestore"
import { Patient } from "../Patients/model"
import { EmrContent, EmrType } from "./model"

export const getEMR = async (id: string) => {
  const snap = await getDoc(doc(db, "patients", id))
  const patient = snap.data() as Patient

  return patient.emr
}

export const addEMR = async (
  id: string,
  oldEmrs: EmrType | undefined,
  newEmr: EmrContent
) => {
  const patientRef = doc(db, "patients", id)

  let newEMRList: EmrType

  // Calculate new EMR object
  if (oldEmrs) {
    newEMRList = oldEmrs
    const index = oldEmrs.findIndex((e) => e.date === newEmr.date)
    if (index > -1) {
      let text = `${newEMRList[index].text}\n${newEmr.text}`
      newEMRList[index].text = text
    } else {
      newEMRList = [...oldEmrs, newEmr]
    }
  } else {
    newEMRList = [newEmr]
  }

  await setDoc(patientRef, { emr: newEMRList }, { merge: true })

  return newEMRList
}
