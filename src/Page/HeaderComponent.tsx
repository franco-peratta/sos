import { useLocation, useNavigate } from "react-router-dom"
import { Avatar, Layout, Menu, Dropdown } from "antd"
import {
  DesktopOutlined,
  PieChartOutlined,
  UserOutlined
} from "@ant-design/icons"
import { signOut } from "../firebase/auth"
import { toAppointments } from "../Appointments/routes"
import { toPatients } from "../Patients/routes"
import { toQueue } from "../Queue/routes"

const { Header } = Layout

export const HeaderComponent = () => {
  const navigate = useNavigate()
  const { pathname } = useLocation()

  const items = [
    {
      label: "Agenda",
      key: "/",
      icon: <PieChartOutlined />,
      onClick: () => {
        navigate(toQueue())
      }
    },
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
          style={{ width: "500px" }}
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

const options = [
  {
    label: "Cerrar Sesion",
    key: "signOut",
    onClick: signOut,
    icon: <></>
  }
]
const UserDropdown = () => {
  const menu = (
    <Menu
      onClick={console.log}
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
