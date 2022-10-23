import { User } from "firebase/auth"
import { doc, getDoc, setDoc } from "firebase/firestore"
import { db } from "../firebase/firestore"

const defaultShift = {
  monday: {
    available: true,
    shifts: [{ from: 8, to: 12 }]
  },
  tuesday: {
    available: true,
    shifts: [{ from: 8, to: 12 }]
  },
  wednesday: {
    available: true,
    shifts: [{ from: 8, to: 12 }]
  },
  thursday: {
    available: true,
    shifts: [{ from: 8, to: 12 }]
  },
  friday: {
    available: true,
    shifts: [{ from: 8, to: 12 }]
  }
}
export const addProvider = async (user: User) => {
  const snap = await getDoc(doc(db, "providers", user.uid))
  if (snap.exists()) throw new Error()

  return setDoc(doc(db, "providers", user.uid), {
    email: user.email,
    name: user.displayName,
    phoneNumber: user.phoneNumber,
    providerId: user.providerId,
    providerData: user.providerData,
    shift: defaultShift
  })
}
