import { useLocation, useNavigate } from "react-router-dom"
import { Avatar, Layout, Menu, Dropdown, Button } from "antd"
import {
  DesktopOutlined,
  PieChartOutlined,
  UserOutlined
} from "@ant-design/icons"
import { signOut } from "../firebase/auth"
import { toTest } from "../components/TestComponent/route"
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
    },
    {
      label: "Test",
      key: "/test",
      icon: <DesktopOutlined />,
      onClick: () => {
        navigate(toTest())
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
      <Avatar style={{ cursor: "pointer" }} size={52} icon={<UserOutlined />} />
    </Dropdown>
  )
}
