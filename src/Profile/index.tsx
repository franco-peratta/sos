import { Button } from "antd"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { User } from "../Auth/Model"
import { Bubble } from "../components/Bubble"
import { Loader } from "../components/Loader"
import { NotFoundPage } from "../components/NotFoundPage"
import { getUserProfileById } from "./Handler"
import { HoursOfOperations } from "./HoursOfOperations"
import { ProfileForm } from "./ProfileForm"

export const Profile = () => {
  const { id } = useParams()
  const [user, setUser] = useState<User>()
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  useEffect(() => {
    id &&
      getUserProfileById(id)
        .then(setUser)
        .catch(() => {
          setError(true)
        })
        .finally(() => setLoading(false))
  }, [id])

  if (loading || !user) return <Loader />
  if (error) return <NotFoundPage />

  const handleSave = () => {
    console.log(user)
  }

  return (
    <Bubble>
      <ProfileForm user={user} />
      <HoursOfOperations user={user} setUser={setUser} />

      <Button
        style={{ display: "block", marginLeft: "auto", marginRight: "0" }}
        type="primary"
        onClick={handleSave}
      >
        Guardar
      </Button>
    </Bubble>
  )
}
