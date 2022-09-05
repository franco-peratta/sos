import { Route, Routes } from "react-router-dom"
import { Queue } from "../Queue"
import { PatientDetails, Patients } from "../Patients"
import { PatientForm } from "../Patients/PatientForm"
import { Appointments, NewAppointment } from "../Appointments"
import { NotFoundPage } from "./NotFoundPage"
import { TC } from "./TestComponent"

export const authRoutes = (
  <Routes>
    <Route path="/" element={<Queue />} />
    <Route path="/pacientes" element={<Patients />} />
    <Route path="/pacientes/:id" element={<PatientDetails />} />
    <Route path="/pacientes/editar/:id" element={<PatientForm />} />
    <Route path="/pacientes/nuevo" element={<PatientForm />} />
    <Route path="/turnos" element={<Appointments />} />
    <Route path="/turnos/nuevo" element={<NewAppointment />} />
    <Route path="/test" element={<TC />} />
    <Route path="*" element={<NotFoundPage />} />
  </Routes>
)

export const routes = (
  <Routes>
    <Route path="*" element={<NotFoundPage />} />
  </Routes>
)
