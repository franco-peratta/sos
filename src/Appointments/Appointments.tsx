import { useEffect, useState } from "react"
import { useNavigate } from "react-router"
import {
  Typography,
  Button,
  Space,
  Card,
  Row,
  Tag,
  Col,
  Popconfirm,
  message
} from "antd"
import {
  PlusOutlined,
  PhoneOutlined,
  ApiOutlined,
  DeleteOutlined
} from "@ant-design/icons"
import { toAppointments, toCreateAppointment } from "./routes"
import { Bubble } from "../components/Bubble"
import {
  Appointment,
  AppointmentWithPatientInfo,
  statusColorMapping
} from "./Model"
import { deleteAppointment, getAppointments } from "./Handler"
import { Loader } from "../components/Loader"

const { Title, Text } = Typography
const { Meta } = Card

export const Appointments = () => {
  const navigate = useNavigate()

  const [loading, setLoading] = useState(true)
  const [appointments, setAppointments] =
    useState<AppointmentWithPatientInfo[]>()

  useEffect(() => {
    getAppointments()
      .then(setAppointments)
      .then(() => setLoading(false))
  }, [])

  const deleteHandler = async (appointment: AppointmentWithPatientInfo) => {
    if (appointments) {
      deleteAppointment(appointment)
        .then(() => {
          setAppointments(
            appointments.filter((app) => app.id !== appointment.id)
          )
          message.success("Turno borrado con exito")
        })
        .catch((e) => {
          message.success("Error al borrar el turno")
          console.error(e)
        })
    }
  }

  console.log(appointments)

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

      {loading ? (
        <Loader />
      ) : appointments?.length ? (
        appointments.map((app) => (
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
                    onConfirm={() => deleteHandler(app)}
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
                  // <Popconfirm
                  //   placement="top"
                  //   title={"Está seguro que desea finalizar esta llamada?"}
                  //   onConfirm={() => {
                  //     openNotification(
                  //       "bottomRight",
                  //       "Llamada finalizada (WIP)"
                  //     )
                  //   }}
                  //   okText="Si"
                  //   cancelText="No"
                  // >
                  //   <Space
                  //     style={{ fontSize: "1.5em", color: "red" }}
                  //     size="middle"
                  //     direction="horizontal"
                  //   >
                  //     Finalizar llamada
                  //     <ApiOutlined key="end" />
                  //   </Space>
                  // </Popconfirm>,
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
                    title={app.patientName}
                    description={app.patientEmail}
                  />
                  <div className="flex--space-between">
                    <Title level={5}>
                      <strong>{app.providerId}</strong>
                    </Title>
                  </div>
                  <Tag style={{ fontSize: "1.2em" }} color="darkblue">
                    {app.date}
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
        ))
      ) : (
        <Text>No hay turnos</Text>
      )}
    </Bubble>
  )
}
