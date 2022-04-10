import { Layout } from "antd"
import { CSSProperties } from "react"
import { Avatar } from "antd"
import { UserOutlined } from "@ant-design/icons"
import { background_secondary } from "../UI/colors"

const { Header } = Layout

export const HeaderComponent = () => {
  return (
    <Header style={header}>
      <div className="flex--space-between">
        <img src="/img/sos-logo.png" alt="Salud Online Solidaria" />
        <Avatar
          style={background_secondary}
          size={52}
          icon={<UserOutlined />}
        />
      </div>
    </Header>
  )
}

const header: CSSProperties = {
  backgroundColor: "#fff",
  height: "auto",
  padding: "0 1.5em",
  borderBottom: "1px solid black"
}
