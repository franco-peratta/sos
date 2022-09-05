import { Jitsi } from "./jitsi"
import { useNavigate, useParams } from "react-router-dom"
import { Loader } from "../components/Loader"
import { infoNotification } from "../Notification"

export const Videocall = () => {
  const navigate = useNavigate()
  const { appointmentId } = useParams()

  if (!appointmentId) return <Loader />

  const handleMeetingEnd = () => {
    infoNotification("Videollamada finaliza")
    navigate("/")
  }

  const { roomName, displayName, password } = {
    roomName: appointmentId,
    displayName: "Dale Loco",
    password: "password"
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
