import { useAuthState } from "react-firebase-hooks/auth"
import { app } from "./config"
import {
  getAuth,
  signInWithEmailAndPassword,
  signOut as signOutFirebase,
  createUserWithEmailAndPassword
} from "firebase/auth"

export const auth = getAuth(app)

export const useAuth = () => useAuthState(auth)

export const signIn = (email: string, password: string) =>
  signInWithEmailAndPassword(auth, email, password)

export const signOut = () => signOutFirebase(auth)

export const register = (email: string, password: string) =>
  createUserWithEmailAndPassword(auth, email, password)
