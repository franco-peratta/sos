import { BrowserRouter } from "react-router-dom"
import { Page } from "../Page"
import { authRoutes } from "../components/routes"
import { useAuth } from "../Auth"
import { LoginPage } from "../Auth"
import "antd/dist/antd.less"

export const RootComponent = () => {
  const auth = useAuth()

  console.log({ auth })

  if (auth) {
    return (
      <BrowserRouter>
        <Page>{authRoutes}</Page>
      </BrowserRouter>
    )
  }

  return <LoginPage />
}
