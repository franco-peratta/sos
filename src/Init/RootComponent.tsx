import { BrowserRouter } from "react-router-dom"
import { Page } from "../components/Page"
import { routes } from "../components/routes"
import { AuthProvider } from "../Auth/AuthContext"

import "antd/dist/antd.less"

export const RootComponent = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Page>{routes}</Page>
      </AuthProvider>
    </BrowserRouter>
  )
}
