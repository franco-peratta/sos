// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app"
import { getAuth } from "firebase/auth"
export {
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged
} from "firebase/auth"
// import { getAnalytics } from "firebase/analytics"

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA2jqIXSgObKAEbPC4ghY44HSafMCIf_dU",
  authDomain: "salud-online-solidaria.firebaseapp.com",
  projectId: "salud-online-solidaria",
  storageBucket: "salud-online-solidaria.appspot.com",
  messagingSenderId: "1067539810233",
  appId: "1:1067539810233:web:d6aaa8cb2b086af55a1868",
  measurementId: "G-N9ET6456ZJ"
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
export const auth = getAuth(app)

// export const analytics = getAnalytics(app)
