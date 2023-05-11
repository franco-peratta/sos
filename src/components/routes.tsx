import { Route, Routes, Navigate, useLocation } from "react-router-dom"
import { NotFoundPage } from "./NotFoundPage"
import { useAuth } from "../Auth/useAuth"
import { LoginPage } from "../Auth"
import { Patients } from "../Patients"
import { PatientDetails } from "../Patients/PatientDetails"

export const routes = (
  <Routes>
    <Route
      path="/"
      element={
        <RequireAuth>
          <Navigate to="/pacientes" />
        </RequireAuth>
      }
    />
    <Route path="/login" element={<LoginPage />} />
    <Route
      path="/pacientes"
      element={
        <RequireAuth>
          <Patients />
        </RequireAuth>
      }
    />
    <Route
      path="/pacientes/:id"
      element={
        <RequireAuth>
          <PatientDetails />
        </RequireAuth>
      }
    />
    {/*<Route
      path="/pacientes/editar/:id"
      element={
        <RequireAuth>
          <PatientForm />
        </RequireAuth>
      }
    />
    <Route
      path="/pacientes/nuevo"
      element={
        <RequireAuth>
          <PatientForm />
        </RequireAuth>
      }
    /> */}
    {/* <Route
      path="/perfil/:id"
      element={
        <RequireAuth>
          <Profile />
        </RequireAuth>
      }
    /> */}
    {/*<Route path="/turnos" element={<Appointments />} />
    <Route path="/turnos/nuevo" element={<NewAppointment />} />
    <Route
      path="/videocall/:patientId/:appointmentId"
      element={<Videocall />}
    /> */}
    <Route
      path="*"
      element={
        <RequireAuth>
          <NotFoundPage />
        </RequireAuth>
      }
    />
  </Routes>
)

function RequireAuth({ children }: { children: JSX.Element }) {
  const { user } = useAuth()
  const location = useLocation()

  if (!user) {
    // Redirect them to the /login page, but save the current location they were
    // trying to go to when they were redirected. This allows us to send them
    // along to that page after they login, which is a nicer user experience
    // than dropping them off on the home page.
    return <Navigate to="/login" state={{ from: location }} replace />
  }

  return children
}
