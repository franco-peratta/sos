import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import {
  CloseOutlined,
  EditOutlined,
  DeleteOutlined,
  PhoneOutlined
} from "@ant-design/icons"
import { PatientWithAppointment } from "./model"
import { Card, Popconfirm, Tabs, Tag, Typography } from "antd"
import { Bubble } from "../components/Bubble"
import { Loader } from "../components/Loader"
import { EMR } from "../EMR"
import { getPatientByIdWithAppointments } from "./Handler"
import { toPatients } from "./routes"
import { errorNotification, successNotification } from "../Notification"
import {
  AppointmentWithPatientInfo,
  statusColorMapping
} from "../Appointments/Model"
import { deleteAppointment } from "../Appointments/Handler"
import "./styles.less"

const { Title, Text } = Typography
const { TabPane } = Tabs
const { Meta } = Card

export const PatientDetails = () => {
  const { id } = useParams()

  const [patient, setPatient] = useState<PatientWithAppointment>()
  const [loading, setIsLoading] = useState(true)

  const navigate = useNavigate()

  useEffect(() => {
    if (id)
      getPatientByIdWithAppointments(id)
        .then((res) => {
          if (!res) {
            return
          }
          setPatient(res)
        })
        .finally(() => setIsLoading(false))
  }, [id])

  if (loading) return <Loader />

  if (!patient) {
    errorNotification("Error inesperado")
    return <span>Error Page goes here - Patient not found</span>
  }

  return (
    <Bubble>
      <div className="flex--space-between">
        <Title>{patient.name}</Title>
        <CloseOutlined
          style={{ fontSize: "1.5em" }}
          onClick={() => {
            navigate(toPatients())
          }}
        />
      </div>
      <div className="card-container">
        <Tabs defaultActiveKey="1" type="card" size="large">
          <TabPane tab="Detalles" key="1">
            <Details patient={patient} />
          </TabPane>
          <TabPane tab="Historia Clinica" key="2">
            <div className="flex--columns">
              <EMR patientId={patient.id} />
            </div>
          </TabPane>
        </Tabs>
      </div>
    </Bubble>
  )
}

const Details = ({ patient }: { patient: PatientWithAppointment }) => {
  const navigate = useNavigate()

  const deleteHandler = async (appointment: AppointmentWithPatientInfo) => {
    deleteAppointment(appointment)
      .then(() => {
        successNotification("Turno borrado con exito")
        navigate(0)
      })
      .catch((e) => {
        successNotification("Error al borrar el turno")
        console.error(e)
      })
  }

  console.log(patient)

  return (
    <>
      <div className="flex--columns">
        <Text>Email: {patient.email}</Text>
        <Text>DNI: {patient.dni}</Text>
        <Text>Fecha de Nacimiento: {patient.dob}</Text>
      </div>
      <br />
      <div>
        <Title level={3}>Turnos</Title>
        <div className="row">
          {patient.Appointment?.map((app) => {
            const Description = () => (
              <div>
                <Tag
                  style={{ fontSize: "1em" }}
                  color={statusColorMapping[app.status]}
                >
                  {app.status.toUpperCase()}
                </Tag>
                <br />
                <br />
                Dr/a: {`${app.providerId}`}
              </div>
            )

            const actions = [
              <Popconfirm
                placement="top"
                title={"Está seguro que desea borrar este turno?"}
                onConfirm={() =>
                  deleteHandler({ ...app, patientId: patient.id })
                }
                okText="Si"
                cancelText="No"
              >
                <DeleteOutlined key="delete" />
              </Popconfirm>,
              <EditOutlined key="edit" />
            ]
            app.status !== "terminado" &&
              actions.push(<PhoneOutlined key="call" />)

            return (
              <Card key={`${app.id}`} style={{ width: 300 }} actions={actions}>
                <Meta
                  title={`${app.date} ${app.time}`}
                  description={<Description />}
                />
              </Card>
            )
          })}
          {!patient.Appointment?.length ? (
            <Text>No hay turnos para este paciente</Text>
          ) : null}
        </div>
      </div>
    </>
  )
}
