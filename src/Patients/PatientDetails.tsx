import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import moment from "moment"
import { Tabs, Typography } from "antd"
import { Patient } from "./model"
import { Bubble } from "../components/Bubble"
import { Loader } from "../components/Loader"
import { EMR } from "../EMR"
import "./styles.less"

const { Title, Text } = Typography
const { TabPane } = Tabs

const patients: Patient[] = [
  {
    id: "1",
    name: "Mike",
    dni: "1",
    email: "fperatta@teladoc.com",
    emr: {
      id: String(1),
      data: [
        {
          date: moment(),
          text: "Le dolia la cabeza"
        },
        {
          date: moment().add(1, "days"),
          text: "Le dolia la espalda"
        }
      ]
    }
  },
  {
    id: "2",
    name: "Homer",
    dni: "2",
    email: "homer@gmail.com"
  },
  {
    id: "3",
    name: "Paco",
    dni: "3",
    email: "paco@gmail.com"
  },
  {
    id: "4",
    name: "Joel",
    dni: "4",
    email: "joel@gmail.com"
  },
  {
    id: "5",
    name: "Mendi",
    dni: "5",
    email: "mendi@gmail.com"
  },
  {
    id: "6",
    name: "Claxton",
    dni: "6",
    email: "claxton@gmail.com"
  },
  {
    id: "7",
    name: "Andy",
    dni: "7",
    email: "andy@gmail.com"
  }
]

export const PatientDetails = () => {
  const { id } = useParams()

  const [patient, setPatient] = useState<Patient>()

  useEffect(() => {
    setPatient(patients.find((patient) => patient.id === id))
  }, [id])

  if (!patient) return <Loader />

  const text = "some text"

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
