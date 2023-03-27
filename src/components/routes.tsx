import { Route, Routes, Navigate } from "react-router-dom"
import { PatientDetails, Patients } from "../Patients"
import { PatientForm } from "../Patients/PatientForm"
import { Profile } from "../Profile"
import { NotFoundPage } from "./NotFoundPage"

export const authRoutes = (
  <Routes>
    <Route path="/" element={<Navigate to="/pacientes" />} />
    <Route path="/pacientes" element={<Patients />} />
    <Route path="/pacientes/:id" element={<PatientDetails />} />
    <Route path="/pacientes/editar/:id" element={<PatientForm />} />
    <Route path="/pacientes/nuevo" element={<PatientForm />} />
    <Route path="/perfil/:id" element={<Profile />} />
    {/*<Route path="/turnos" element={<Appointments />} />
    <Route path="/turnos/nuevo" element={<NewAppointment />} />
    <Route
      path="/videocall/:patientId/:appointmentId"
      element={<Videocall />}
    /> */}
    <Route path="*" element={<NotFoundPage />} />
  </Routes>
)

export const routes = (
  <Routes>
    <Route path="*" element={<NotFoundPage />} />
  </Routes>
)
