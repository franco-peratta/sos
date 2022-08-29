import { BrowserRouter } from "react-router-dom"
import { Page } from "../Page"
import { authRoutes } from "../components/routes"
import { useAuth } from "../Auth"
import { LoginPage } from "../Auth"
import "antd/dist/antd.less"
import { Alert } from "antd"
import ErrorBoundary from "antd/lib/alert/ErrorBoundary"
import { LoaderPage } from "../components/Loader"

export const RootComponent = () => {
  const [user, loading, error] = useAuth()

  return (
    <ErrorBoundary>
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
    </ErrorBoundary>
  )
}
