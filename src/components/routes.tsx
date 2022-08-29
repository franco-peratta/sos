import { Route, Routes } from "react-router-dom"
import { Queue } from "../Queue"
import { PatientDetails, Patients } from "../Patients"
import { Appointments, NewAppointment } from "../Appointments"
import { TC } from "./TestComponent"
import { NotFoundPage } from "./NotFoundPage"

export const authRoutes = (
  <Routes>
    <Route path="/" element={<Queue />}></Route>
    <Route path="/pacientes" element={<Patients />}></Route>
    <Route path="/pacientes/:id" element={<PatientDetails />}></Route>
    <Route path="/turnos" element={<Appointments />}></Route>
    <Route path="/turnos/nuevo" element={<NewAppointment />}></Route>
    <Route path="/test" element={<TC />}></Route>
    <Route element={<NotFoundPage />}></Route>
  </Routes>
)

export const routes = (
  <Routes>
    <Route path="*" element={<NotFoundPage />} />
  </Routes>
)
