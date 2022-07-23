import { Jitsi } from "./jitsi"

export const TC = () => {
  const {roomName, displayName,password} = {
    roomName: "my-room-name-papa",
    displayName: "Dale Loco",
    password: "password",
  }

  return (
      <Jitsi
        containerStyles={{height:"100%", width:"100%"}}
        roomName={roomName}
        displayName={displayName}
        password={password}
        onMeetingEnd={() => console.log("Meeting has ended")}
        loadingComponent={<p>loading ...</p>}
        errorComponent={<p>Oops, something went wrong...</p>}
      />
  )
}
