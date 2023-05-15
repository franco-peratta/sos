import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { CloseOutlined, DeleteOutlined, PhoneOutlined } from "@ant-design/icons"
import { PatientWithAppointments } from "./model"
import { statusColorMapping } from "../Appointments/model"
import { Card, Popconfirm, Tabs, Tag, Typography } from "antd"
import { Bubble } from "../components/Bubble"
import { Loader } from "../components/Loader"
import { EMR } from "../EMR"
import { getPatientByIdWithAppointments } from "./Handler"
import { toPatients } from "./routes"
import { errorNotification, successNotification } from "../Notification"
import "./styles.less"
import { updateEMR } from "../EMR/Handler"

const { Title, Text } = Typography
const { TabPane } = Tabs
const { Meta } = Card

export const PatientDetails = () => {
  const { id } = useParams()

  const [patient, setPatient] = useState<PatientWithAppointments>()
  const [loading, setIsLoading] = useState(true)

  const navigate = useNavigate()

  useEffect(() => {
    if (id)
      getPatientByIdWithAppointments(id)
        .then((res) => {
          setPatient(res.data)
        })
        .finally(() => setIsLoading(false))
  }, [id])

  if (loading) return <Loader />

  if (!patient) {
    errorNotification("Error inesperado")
    return <span>Error Page goes here - Patient not found</span>
  }

  const changeEmr = (emr: string) => {
    updateEMR(patient.id, emr)
      .then((res) => {
        const newEmr = res.data.emr
        setPatient({ ...patient, emr: newEmr })
        successNotification("Historia clinica actualizada con exito")
      })
      .catch((e) => {
        errorNotification("Error al actualizar la historia clinica")
        console.error(e)
      })
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
              <EMR patient={patient} updateEmr={changeEmr} />
            </div>
          </TabPane>
        </Tabs>
      </div>
    </Bubble>
  )
}

const Details = ({ patient }: { patient: PatientWithAppointments }) => {
  // const navigate = useNavigate()

  const deleteHandler = async (appointment: any) => {
    // deleteAppointment(appointment)
    //   .then(() => {
    //     successNotification("Turno borrado con exito")
    //     navigate(0)
    //   })
    //   .catch((e) => {
    //     successNotification("Error al borrar el turno")
    //     console.error(e)
    //   })
  }

  return (
    <>
      <div
        className="flex--columns"
        style={{ fontSize: "1.5em", gap: "0.5em" }}
      >
        <Text>
          <strong>Email:</strong> {patient.email}
        </Text>
        <Text>
          <strong>DNI:</strong> {patient.dni}
        </Text>
        <Text>
          <strong>Fecha de nacimiento:</strong> {patient.dob}
        </Text>
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
                Dr/a: {`${app.provider?.name}`}
              </div>
            )
            console.log(app)

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
              <PhoneOutlined key="call" disabled={app.status === "terminado"} />
            ]

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
            <Text>El paciente no tiene turnos</Text>
          ) : null}
        </div>
      </div>
    </>
  )
}
