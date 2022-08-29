import { Route, Routes } from "react-router-dom"
import { Queue } from "../Queue"
import { PatientDetails, Patients } from "../Patients"
import { Appointments, NewAppointment } from "../Appointments"
import { TC } from "./TestComponent"

export const authRoutes = (
  <Routes>
    <Route path="/" element={<Queue />}></Route>
    <Route path="/pacientes" element={<Patients />}></Route>
    <Route path="/pacientes/:id" element={<PatientDetails />}></Route>
    <Route path="/turnos" element={<Appointments />}></Route>
    <Route path="/turnos/nuevo" element={<NewAppointment />}></Route>
    <Route path="/test" element={<TC />}></Route>
    <Route element={() => <div>404 Not Found!</div>}></Route>
  </Routes>
)

export const routes = (
  <Routes>
    <Route
      path="*"
      element={() => {
        return <div>404 Not Found!</div>
      }}
    />
  </Routes>
)
