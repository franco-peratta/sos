import { useEffect } from "react"
import { useNavigate } from "react-router"
import {
  Typography,
  Button,
  Space,
  Card,
  Row,
  Tag,
  Col,
  Popconfirm
} from "antd"
import {
  PlusOutlined,
  PhoneOutlined,
  ApiOutlined,
  DeleteOutlined
} from "@ant-design/icons"
import { toCreateAppointment } from "./routes"
import { openNotification } from "../Notification"
import { Bubble } from "../components/Bubble"
import {
  deleteAppointment,
  loadAppointmentsFx,
  useAppointmentsStore
} from "./store"
import { statusColorMapping } from "./Model"
import "moment/locale/es-mx"

const { Title } = Typography
const { Meta } = Card

export const Appointments = () => {
  const { appointments } = useAppointmentsStore()

  const navigate = useNavigate()

  useEffect(() => {
    loadAppointmentsFx()
  }, [])

  return (
    <Bubble>
      <div className="flex--space-between">
        <Title>Turnos</Title>
        <Button
          onClick={() => navigate(toCreateAppointment())}
          type="default"
          size="large"
        >
          <Space direction="horizontal">
            <PlusOutlined />
            Crear turno
          </Space>
        </Button>
      </div>

      {appointments.map((app) => (
        <Row key={app.id}>
          <Col style={{ width: "100%", marginBottom: "1em" }}>
            <Card
              style={{
                borderColor: "#ddd",
                boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px"
              }}
              actions={[
                <Popconfirm
                  placement="top"
                  title={"Está seguro que desea borrar este turno?"}
                  onConfirm={() => {
                    deleteAppointment(app.id)
                  }}
                  okText="Si"
                  cancelText="No"
                >
                  <Space
                    style={{ fontSize: "1.5em", color: "black" }}
                    size="middle"
                    direction="horizontal"
                  >
                    Borrar
                    <DeleteOutlined key="delete" />
                  </Space>
                </Popconfirm>,
                <Popconfirm
                  placement="top"
                  title={"Está seguro que desea finalizar esta llamada?"}
                  onConfirm={() => {
                    openNotification("bottomRight", "Llamada finalizada (WIP)")
                  }}
                  okText="Si"
                  cancelText="No"
                >
                  <Space
                    style={{ fontSize: "1.5em", color: "red" }}
                    size="middle"
                    direction="horizontal"
                  >
                    Finalizar llamada
                    <ApiOutlined key="end" />
                  </Space>
                </Popconfirm>,
                <Space
                  style={{ fontSize: "1.5em", color: "green" }}
                  size="middle"
                  direction="horizontal"
                >
                  Iniciar llamada
                  <PhoneOutlined key="call" />
                </Space>
              ]}
            >
              <div className="flex--space-between ">
                <Meta
                  title={app.patient.name}
                  description={app.patient.email}
                />
                <div>{app.providerId}</div>
                <Tag style={{ fontSize: "1.2em" }} color="darkblue">
                  {app.date.locale("es-mx").format("dddd DD/MM/YYYY HH:mm")}
                </Tag>
                <Tag
                  style={{ fontSize: "1em" }}
                  color={statusColorMapping[app.status]}
                >
                  {app.status.toUpperCase()}
                </Tag>
              </div>
            </Card>
          </Col>
        </Row>
      ))}
    </Bubble>
  )
}
