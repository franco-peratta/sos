import { BrowserRouter } from "react-router-dom"
import { Page } from "../Page"
import { routes } from "../components/routes"
import "antd/dist/antd.less"

export const RootComponent = () => {
  return (
    <BrowserRouter>
      <Page>{routes}</Page>
    </BrowserRouter>
  )
}
