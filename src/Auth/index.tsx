import { signInWithEmailAndPassword } from "firebase/auth"
import { auth, signOut as signOutFirebase } from "../firebase/config"
import { useAuthState } from "react-firebase-hooks/auth"
export { LoginPage } from "./Login"

export const useAuth = () => useAuthState(auth)

export const signIn = (email: string, password: string) =>
  signInWithEmailAndPassword(auth, email, password)

export const signOut = () => signOutFirebase(auth)
