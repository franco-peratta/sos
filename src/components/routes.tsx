import { Route, Routes } from "react-router-dom"
import { Queue } from "../Queue"
import { Patients } from "../Patients"
import { Appointments, NewAppointment } from "../Appointments"
import { TC } from "./TestComponent"

export const routes = (
  <Routes>
    <Route path="/" element={<Queue />}></Route>
    <Route path="/pacientes" element={<Patients />}></Route>
    <Route path="/turnos" element={<Appointments />}></Route>
    <Route path="/turnos/nuevo" element={<NewAppointment />}></Route>
    <Route path="/test" element={<TC />}></Route>
  </Routes>
)
