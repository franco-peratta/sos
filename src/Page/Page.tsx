import { ReactNode } from "react"
import { Layout } from "antd"
import { HeaderComponent } from "./HeaderComponent"
import "./styles.less"
import "../UI/global_styles.less"

type Props = {
  children: ReactNode
}

export const Page = ({ children }: Props) => {
  return (
    <Layout className="layout">
      <HeaderComponent />
      <Layout>
        <div className="content">{children}</div>
      </Layout>
    </Layout>
  )
}
