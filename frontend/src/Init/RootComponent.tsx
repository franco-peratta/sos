import { useState } from "react"
import { BrowserRouter } from "react-router-dom"
import { Page } from "../Page"
import { authRoutes, routes } from "../components/routes"
import "antd/dist/antd.less"

export const RootComponent = () => {
  const [auth, setauth] = useState(true)

  return auth ? (
    <BrowserRouter>
      <Page>{authRoutes}</Page>
    </BrowserRouter>
  ) : (
    <BrowserRouter>{routes}</BrowserRouter>
  )
}
