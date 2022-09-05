import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { CloseOutlined } from "@ant-design/icons"
import { Patient } from "./model"
import { message, Tabs, Typography } from "antd"
import { Bubble } from "../components/Bubble"
import { Loader } from "../components/Loader"
import { EMR } from "../EMR"
import { getPatientById } from "./Handler"
import "./styles.less"
import { toPatients } from "./routes"

const { Title, Text } = Typography
const { TabPane } = Tabs

export const PatientDetails = () => {
  const { id } = useParams()

  const [patient, setPatient] = useState<Patient>()

  const navigate = useNavigate()

  useEffect(() => {
    if (id)
      getPatientById(id).then((res) => {
        if (!res) {
          message.error("Paciente no encontrado")
          return
        }
        setPatient(res)
      })
  }, [id])

  if (!patient) return <Loader />

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
            <div className="flex--columns">
              <Text>Email: {patient.email}</Text>
              <Text>DNI: {patient.dni}</Text>
            </div>
          </TabPane>
          <TabPane tab="Historia Clinica" key="2">
            <div className="flex--columns">
              <EMR id={patient.id} />
            </div>
          </TabPane>
        </Tabs>
      </div>
    </Bubble>
  )
}
