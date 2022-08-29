import { CSSProperties } from "react"
import { Avatar, Layout, Menu, Dropdown, Button } from "antd"
import { UserOutlined } from "@ant-design/icons"
import { signOut } from "../Auth"

const { Header } = Layout

export const HeaderComponent = () => {
  return (
    <Header style={header}>
      <div className="flex--space-between">
        <img src="/img/sos-logo.png" alt="Salud Online Solidaria" />
        <UserDropdown />
      </div>
    </Header>
  )
}

const UserDropdown = () => {
  const menu = (
    <Menu onClick={console.log}>
      <Button type="text" onClick={signOut}>
        Cerrar Sesion
      </Button>
    </Menu>
  )

  return (
    <Dropdown overlay={menu} trigger={["click"]}>
      <Avatar style={avatar} size={52} icon={<UserOutlined />} />
    </Dropdown>
  )
}

const header: CSSProperties = {
  backgroundColor: "#fff",
  height: "auto",
  padding: "0 1.5em",
  borderBottom: "1px solid black"
}

const avatar: CSSProperties = {
  cursor: "pointer"
}
