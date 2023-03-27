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
  Popconfirm
} from "antd"
import { PlusOutlined, PhoneOutlined, DeleteOutlined } from "@ant-design/icons"
import { toCreateAppointment } from "./routes"
import { Bubble } from "../components/Bubble"
import { AppointmentWithPatientInfo, statusColorMapping } from "./Model"
import {
  changeAppointmentStatusById,
  deleteAppointment,
  getAppointments
} from "./Handler"
import { Loader } from "../components/Loader"
import { infoNotification, successNotification } from "../Notification"

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
          successNotification("Turno borrado con exito")
        })
        .catch((e) => {
          successNotification("Error al borrar el turno")
          console.error(e)
        })
    }
  }

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
                  <Popconfirm
                    placement="top"
                    title={"Está seguro que desea realizar esta llamada?"}
                    onConfirm={() => {
                      infoNotification("Creando llamada")
                      changeAppointmentStatusById(app.id, "en progreso")
                        .then(() =>
                          navigate(`/videocall/${app.patientId}/${app.id}`)
                        )
                        .catch(() => console.log("@TODO catchear el error"))
                    }}
                    okText="Si"
                    cancelText="No"
                    disabled={app.status === "terminado"}
                  >
                    <Space
                      style={{ fontSize: "1.5em", color: "green" }}
                      size="middle"
                      direction="horizontal"
                    >
                      Iniciar llamada
                      <PhoneOutlined key="call" />
                    </Space>
                  </Popconfirm>
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
