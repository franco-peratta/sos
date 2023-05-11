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

export const signIn = async (token: string, user: User) => {}
