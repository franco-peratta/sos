import { User } from "firebase/auth"
import { addDoc, collection } from "firebase/firestore"
import { db } from "../firebase/firestore"

const defaultShift = {
  0: false,
  1: false,
  2: false,
  3: false,
  4: false,
  5: false,
  6: false,
  7: false,
  8: false,
  9: true,
  10: true,
  11: true,
  12: true,
  13: false,
  14: false,
  15: false,
  16: true,
  17: true,
  18: true,
  19: true,
  20: false,
  21: false,
  22: false,
  23: false
}

export const addProvider = (user: User) => {
  return addDoc(collection(db, "providers"), {
    id: user.uid,
    email: user.email,
    shift: defaultShift
  })
}
