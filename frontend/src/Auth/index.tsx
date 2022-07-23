import { useEffect, useState } from "react"
import { signInWithEmailAndPassword, User } from "firebase/auth"
import {
  auth,
  signOut as signOutFirebase,
  onAuthStateChanged
} from "../firebase/config"
export { LoginPage } from "./Login"

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setUser(user)
    })
  }, [])

  return user
}

export const signIn = (email: string, password: string) =>
  signInWithEmailAndPassword(auth, email, password)

export const signOut = () => signOutFirebase(auth)
