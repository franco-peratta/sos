import { useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import { Layout, Menu } from "antd"
import {
  DesktopOutlined,
  PieChartOutlined,
  FileOutlined,
  ArrowLeftOutlined,
  ArrowRightOutlined
} from "@ant-design/icons"
import "./styles.less"
import { toAppointments } from "../Appointments/routes"
import { toPatients } from "../Patients/routes"
import { toQueue } from "../Queue/routes"
import { toTest } from "../components/TestComponent/route"

const { Sider } = Layout

export const PlatformNavigation = () => {
  const navigate = useNavigate()
  const { pathname } = useLocation()

  const [collapsed, setCollapsed] = useState(false)

  const onCollapse = (collapsed: boolean) => {
    setCollapsed(collapsed)
  }
  const toggleCollapsed = () => {
    setCollapsed(!collapsed)
  }

  return (
    <Sider
      trigger={null}
      collapsible
      collapsed={collapsed}
      onCollapse={onCollapse}
      theme="dark"
      // style={background_secondary}
    >
      {collapsed ? (
        <div className="flex--centered">
          <ArrowRightOutlined
            className="trigger"
            style={{ color: "white" }}
            onClick={toggleCollapsed}
          />
        </div>
      ) : (
        <div className="flex--end">
          <ArrowLeftOutlined
            className="trigger"
            style={{ color: "white" }}
            onClick={toggleCollapsed}
          />
        </div>
      )}

      <Menu
        theme="dark"
        defaultSelectedKeys={["/"]}
        selectedKeys={[`/${pathname.split("/")[1]}`]}
      >
        {/* <Menu style={background_secondary}> */}
        <Menu.Item
          key={toQueue()}
          style={{ color: "white" }}
          icon={<PieChartOutlined />}
          onClick={() => {
            navigate(toQueue())
          }}
        >
          Agenda
        </Menu.Item>
        <Menu.Item
          key={toPatients()}
          style={{ color: "white" }}
          icon={<DesktopOutlined />}
          onClick={() => {
            navigate(toPatients())
          }}
        >
          Pacientes
        </Menu.Item>
        <Menu.Item
          key={toAppointments()}
          style={{ color: "white" }}
          icon={<FileOutlined />}
          onClick={() => {
            navigate(toAppointments())
          }}
        >
          Turnos
        </Menu.Item>
        <Menu.Item
          key={toTest()}
          style={{ color: "white" }}
          icon={<DesktopOutlined />}
          onClick={() => {
            navigate(toTest())
          }}
        >
          Test
        </Menu.Item>
      </Menu>
    </Sider>
  )
}
