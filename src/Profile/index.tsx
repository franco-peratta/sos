import { useParams } from "react-router-dom"

export const Profile = () => {
  const { id } = useParams()

  console.log({ id })

  return <div>profile</div>
}
