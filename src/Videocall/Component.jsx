import { useEffect, useState } from "react"
import { Jitsi } from "./jitsi"
import { useNavigate, useParams } from "react-router-dom"
import { Loader } from "../components/Loader"
import { infoNotification } from "../Notification"
import { checkPatientIdAndAppId } from "./Handler"
import { changeAppointmentStatusById } from "../Appointments/Handler"

export const Videocall = () => {
  const navigate = useNavigate()
  const { patientId, appointmentId } = useParams()
  const [loading, setloading] = useState(true)
  const [error, setError] = useState()
  const [data, setData] = useState()

  useEffect(() => {
    checkPatientIdAndAppId(patientId, appointmentId)
      .then((res) => {
        setData(res)
      })
      .catch((error) => {
        console.log({ error })
        setError(error.message)
      })
      .finally(() => setloading(false))
  }, [patientId, appointmentId])

  if (loading) return <Loader />
  if (error) return <span>Error page goes here | {error}</span>

  const handleMeetingEnd = () => {
    infoNotification("Videollamada finaliza")
    changeAppointmentStatusById(data.id, data.appointment.id, "terminado")
    navigate("/")
  }
  // displayName no estaria funcionando
  // password funciona para el paciente SOLO si el medico se metio antes
  const { roomName, displayName, password } = {
    roomName: appointmentId,
    displayName: `Turno con ${data.name}`,
    password: data.dni
  }

  return (
    <Jitsi
      containerStyles={{ height: "100%", width: "100%" }}
      roomName={roomName}
      displayName={displayName}
      password={password}
      onMeetingEnd={handleMeetingEnd}
      loadingComponent={<p>loading ...</p>}
      errorComponent={<p>Oops, something went wrong...</p>}
    />
  )
}
