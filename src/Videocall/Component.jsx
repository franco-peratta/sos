import { useEffect, useState } from "react"
import { Jitsi } from "./jitsi"
import { useNavigate, useParams } from "react-router-dom"
import { Loader } from "../components/Loader"
import { infoNotification } from "../Notification"
import { checkPatientIdAndAppId } from "./Handler"
import { changeAppointmentStatusById } from "../Appointments/Handler"
import { RightPanel } from "./RightPanel"
import "./styles.less"

export const Videocall = () => {
  const navigate = useNavigate()
  const { patientId, appointmentId } = useParams()
  const [loading, setloading] = useState(true)
  const [error, setError] = useState()
  const [data, setData] = useState()
  const [collapsed, setCollapsed] = useState(false)

  useEffect(() => {
    document.getElementById("main").style.paddingLeft = 0
    document.getElementById("main").style.paddingRight = 0
    document.getElementById("main").style.paddingTop = 0
  }, [])

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
    <div
      className="videocall-container"
      style={{
        gridTemplateColumns: `${collapsed ? "98.5%" : "75%"} auto`
      }}
    >
      <Jitsi
        containerStyles={{ height: "100%", width: "100%" }}
        roomName={roomName}
        displayName={displayName}
        password={password}
        onMeetingEnd={handleMeetingEnd}
        loadingComponent={<p>loading ...</p>}
        errorComponent={<p>Oops, something went wrong...</p>}
      />
      <RightPanel
        patientInfo={data}
        collapsed={collapsed}
        setCollapsed={setCollapsed}
      />
    </div>
  )
}
