import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { message, Tabs, Typography } from "antd"
import { Patient } from "./model"
import { Bubble } from "../components/Bubble"
import { Loader } from "../components/Loader"
import { EMR } from "../EMR"
import { getPatientById } from "./Handler"
import "./styles.less"

const { Title, Text } = Typography
const { TabPane } = Tabs

export const PatientDetails = () => {
  const { id } = useParams()

  const [patient, setPatient] = useState<Patient>()

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
      <Title>{patient.name}</Title>
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
              <EMR emr={patient.emr} />
            </div>
          </TabPane>
        </Tabs>
      </div>
    </Bubble>
  )
}
