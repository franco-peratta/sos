import { http } from "../http"
import { Patient } from "./model"

export const getPatients = async () => {
  const res = await http("/patients", {
    method: "GET"
  })
  const json = await res.json()
  return json.data
}

export const getPatientById = async (id: string) => {
  const res = await http(`/patients/${id}`, {
    method: "GET"
  })
  const json = await res.json()
  return json.data
}

export const getPatientByIdWithAppointments = async (id: string) => {
  const res = await http(`/patients/${id}/appointments`, {
    method: "GET"
  })
  const json = await res.json()
  return json.data
}

export const addPatient = async (patient: Patient) => {
  const res = await http("/patients", {
    method: "POST",
    body: JSON.stringify(patient)
  })
  const json = await res.json()
  return json.data
}
