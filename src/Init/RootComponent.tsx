import { BrowserRouter } from "react-router-dom"
import { Alert } from "antd"
import { Page } from "../components/Page"
import { LoginPage } from "../Auth"
import { useAuth } from "../firebase/auth"
import { LoaderPage } from "../components/Loader"
import { authRoutes } from "../components/routes"

import "antd/dist/antd.less"

export const RootComponent = () => {
  const [user, loading, error] = useAuth()

  return (
    <BrowserRouter>
      {loading ? (
        <LoaderPage />
      ) : error ? (
        <Page>
          <div>Oops... Something went wrong.</div>
          <Alert message="Error Text" type="error" />
        </Page>
      ) : user ? (
        <Page>{authRoutes}</Page>
      ) : (
        <LoginPage />
      )}
    </BrowserRouter>
  )
}
