import { createDomain } from "effector"
import { useStore } from "effector-react"
import moment from "moment"
import { Appointment } from "./Model"

const appointmentsDomain = createDomain("appointments")

const loadAppointments = () => {
  const appointmentsData: Appointment[] = [
    {
      id: "1",
      date: moment(),
      patient: {
        id: "7",
        name: "Andy",
        dni: "38919769",
        email: "andy@gmail.com"
      },
      providerId: "marcos",
      status: "pendiente"
    },
    {
      id: "2",
      date: moment(),
      patient: {
        id: "7",
        name: "Andy",
        dni: "38919769",
        email: "andy@gmail.com"
      },
      providerId: "marcos",
      status: "actual",
      reasons: "Me duele la cola"
    },
    {
      id: "3",
      date: moment(),
      patient: {
        id: "7",
        name: "Andy",
        dni: "38919769",
        email: "andy@gmail.com"
      },
      providerId: "marcos",
      status: "terminado"
    },
    {
      id: "4",
      date: moment(),
      patient: {
        id: "7",
        name: "Andy",
        dni: "38919769",
        email: "andy@gmail.com"
      },
      providerId: "marcos",
      status: "pendiente"
    }
  ]
  return appointmentsData
}

export const loadAppointmentsFx = appointmentsDomain.effect(() =>
  loadAppointments()
)

export const deleteAppointment = appointmentsDomain.event<string>()

type State = {
  appointments: Appointment[]
}

const initialState: State = {
  appointments: []
}

export const $appointments = appointmentsDomain
  .store(initialState)
  .on(loadAppointmentsFx.done, (state, payload) => {
    return { ...state, appointments: payload.result }
  })
  .on(deleteAppointment, (state, payload) => {
    console.log(payload)

    const newApps = state.appointments.filter(({ id }) => id !== payload)

    return { ...state, appointments: newApps }
  })

export const useAppointmentsStore = () => useStore($appointments)
