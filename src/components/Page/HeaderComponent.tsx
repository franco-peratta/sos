import { useLocation, useNavigate } from "react-router-dom"
import { Avatar, Layout, Menu, Dropdown, Button, Drawer } from "antd"
import {
  DesktopOutlined,
  PieChartOutlined,
  UserOutlined,
  MenuOutlined
} from "@ant-design/icons"
import { signOut, useAuth } from "../../firebase/auth"
import { toAppointments } from "../../Appointments/routes"
import { toPatients } from "../../Patients/routes"
import useMediaQuery from "../../UI/useMediaQuery"
import { useState } from "react"

const { Header } = Layout

const HeaderDesktop = () => {
  const navigate = useNavigate()
  const { pathname } = useLocation()

  const items = [
    {
      label: "Pacientes",
      key: "/pacientes",
      icon: <DesktopOutlined />,
      onClick: () => {
        navigate(toPatients())
      }
    },
    {
      label: "Turnos",
      key: "/turnos",
      icon: <PieChartOutlined />,
      onClick: () => {
        navigate(toAppointments())
      }
    }
  ]

  return (
    <Header>
      <div className="header">
        <img
          className="left"
          src="/img/sos-logo.png"
          alt="Salud Online Solidaria"
          onClick={() => navigate("/")}
        />
        <Menu
          className="center"
          theme="dark"
          style={{ display: "flex", justifyContent: "center", width: "100%" }}
          mode="horizontal"
          defaultSelectedKeys={["/"]}
          selectedKeys={[`/${pathname.split("/")[1]}`]}
          items={items.map(({ key, label, onClick, icon }) => ({
            key: key,
            label: label,
            onClick: onClick,
            icon: icon
          }))}
        />
        <div className="right">
          <UserDropdown />
        </div>
      </div>
    </Header>
  )
}

const HeaderMobile = () => {
  const navigate = useNavigate()
  const [open, setOpen] = useState(false)

  const handleDrawer = () => {
    setOpen(!open)
  }

  return (
    <Header>
      <div className="header--mobile">
        <Button size="large" type="text" onClick={handleDrawer}>
          <MenuOutlined style={{ fontSize: "1.75em", color: "white" }} />
        </Button>
        <img
          className="left"
          src="/img/sos-logo.png"
          alt="Salud Online Solidaria"
          onClick={() => navigate("/")}
        />
        <div className="right">
          <UserDropdown />
        </div>
      </div>
      <Drawer
        title="Basic Drawer"
        key="drawer"
        placement="left"
        closable={true}
        onClose={() => setOpen(!open)}
        open={open}
      >
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </Drawer>
    </Header>
  )
}

const UserDropdown = () => {
  const navigate = useNavigate()
  const [user] = useAuth()

  const options = [
    {
      label: "Perfil",
      key: "profile",
      onClick: () => navigate(`/perfil/${user?.uid}`),
      icon: <></>
    },
    {
      label: "Cerrar Sesion",
      key: "signOut",
      onClick: signOut,
      icon: <></>
    }
  ]

  const menu = (
    <Menu
      items={options.map(({ key, label, onClick, icon }) => ({
        key: key,
        label: label,
        onClick: onClick,
        icon: icon
      }))}
    />
  )

  return (
    <Dropdown overlay={menu} trigger={["click"]}>
      <Avatar style={{ cursor: "pointer" }} size={52} icon={<UserOutlined />} />
    </Dropdown>
  )
}

export const HeaderComponent = () => {
  const isDesktop = useMediaQuery("(min-width: 900px)")

  return isDesktop ? <HeaderDesktop /> : <HeaderMobile />
}