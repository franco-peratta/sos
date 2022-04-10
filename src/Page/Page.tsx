import { FC } from "react"
import { Layout } from "antd"
import { HeaderComponent } from "./HeaderComponent"
import { PlatformNavigation } from "../LeftColumn"
import "./styles.less"
import "../UI/global_styles.less"

export const Page: FC = ({ children }) => {
  return (
    <Layout className="layout">
      <HeaderComponent />
      <Layout>
        <PlatformNavigation />
        <div className="content">{children}</div>
      </Layout>
    </Layout>
  )
}
