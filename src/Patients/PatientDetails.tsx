import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { CloseOutlined } from "@ant-design/icons"
import { Patient } from "./model"
import { Tabs, Typography } from "antd"
import { Bubble } from "../components/Bubble"
import { Loader } from "../components/Loader"
import { EMR } from "../EMR"
import { getPatientById } from "./Handler"
import { toPatients } from "./routes"
import { errorNotification } from "../Notification"

import "./styles.less"

const { Title, Text } = Typography
const { TabPane } = Tabs

export const PatientDetails = () => {
  const { id } = useParams()

  const [patient, setPatient] = useState<Patient>()
  const [loading, setIsLoading] = useState(true)

  const navigate = useNavigate()

  useEffect(() => {
    if (id)
      getPatientById(id)
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
            <div className="flex--columns">
              <Text>Email: {patient.email}</Text>
              <Text>DNI: {patient.dni}</Text>
              <Text>Fecha de Nacimiento: {patient.dob}</Text>
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
