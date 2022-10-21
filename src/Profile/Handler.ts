import { getDoc, doc } from "firebase/firestore"
import { User } from "../Auth/Model"
import { db } from "../firebase/firestore"

export const getUserProfileById = async (id: string) => {
  const snap = await getDoc(doc(db, "providers", id))
  if (!snap.exists()) throw new Error("Medico no encontrado")

  return { ...snap.data() } as User
}
