import { useCallback, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import moment, { Moment } from "moment"
import {
  Form,
  Typography,
  DatePicker,
  TimePicker,
  Row,
  Space,
  Button,
  Select,
  Steps
} from "antd"
import { CloseOutlined } from "@ant-design/icons"
import { toAppointments } from "./routes"
import { Bubble } from "../components/Bubble"

import { Patient } from "../Patients/model"
import { getPatients } from "../Patients/Handler"
import { addAppointment } from "./Handler"
import { APPOINTMENT_STATUS } from "./Model"
import { v4 as uuidv4 } from "uuid"
import { errorNotification, successNotification } from "../Notification"

import "./styles.less"

const { Option } = Select
const { Title } = Typography
const { Step } = Steps

const steps = ["Elegir paciente", "Elegir fecha", "Validar datos"]

export const NewAppointment = () => {
  const navigate = useNavigate()

  const [idForm] = Form.useForm()
  const [detailsForm] = Form.useForm()

  const [current, setCurrent] = useState(0)
  const [medics, setMedics] = useState<string[]>()
  const [patients, setPatients] = useState<Patient[]>()
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    getPatients().then(setPatients)
    setMedics(["Cami", "Marcos", "Lucrecia"])
  }, [])

  const next = useCallback(() => {
    if (current === 0) {
      idForm
        .validateFields()
        .then(() => setCurrent((current) => current + 1))
        .catch(() => {})
    }
    if (current === 1) {
      detailsForm
        .validateFields()
        .then(() => setCurrent((current) => current + 1))
        .catch(() => {})
    }
  }, [idForm, detailsForm, current])

  const prev = () => {
    setCurrent((prev) => prev - 1)
  }

  const submit = () => {
    setIsLoading(true)
    const patientId = idForm.getFieldsValue().patient
    const values = detailsForm.getFieldsValue()
    const appointment = {
      id: uuidv4(),
      status: APPOINTMENT_STATUS.pendiente,
      date: values.date.format("DD/MM/YYYY"),
      time: values.time.format("HH:mm"),
      providerId: values.medic
    }
    addAppointment(patientId, appointment)
      .then(() => {
        navigate(toAppointments())
        successNotification("Turno creado correctamente")
      })
      .catch((e) => {
        errorNotification("Error al crear el turno")
        console.error(e)
      })
      .finally(() => setIsLoading(false))
  }

  const disabledDates = (current: Moment) => {
    // Cannot select days before today
    return current && current < moment().startOf("day")
  }

  const onMedicChange = (value: string) => {
    detailsForm.setFieldsValue({ medic: value })
    detailsForm.setFieldsValue({ date: moment() })
  }

  return (
    <Bubble>
      <div className="flex--space-between">
        <Title>Nuevo turno</Title>
        <CloseOutlined
          style={{ fontSize: "1.5em" }}
          onClick={() => {
            navigate(toAppointments())
          }}
        />
      </div>
      <Steps current={current}>
        {steps.map((item) => (
          <Step key={item} title={item} />
        ))}
      </Steps>
      <div className="steps-content">
        <div className="form">
          <Form
            form={idForm}
            name="patient-authentication"
            layout="vertical"
            onFinish={next}
            style={{ display: current === 0 ? "inherit" : "none" }}
          >
            <Form.Item
              name="patient"
              label="Paciente"
              rules={[
                {
                  required: true,
                  message: "Por favor, elija un paciente"
                }
              ]}
            >
              <Select
                showSearch
                size="large"
                style={{ width: 200 }}
                placeholder="Paciente"
                optionFilterProp="children"
                // filterOption={(input, option) => {
                //   if (option && option.children) {
                //     return (
                //       option.children
                //         .toString()
                //         .toLowerCase()
                //         .indexOf(input.toLowerCase()) >= 0
                //     )
                //   }
                //   return false
                // }}
                loading={!patients}
              >
                {patients &&
                  patients.map((p, index) => (
                    <Option key={index} value={p.id}>
                      {p.name}
                    </Option>
                  ))}
              </Select>
            </Form.Item>
          </Form>

          <Form
            form={detailsForm}
            layout="vertical"
            name="details"
            style={{ display: current === 1 ? "inherit" : "none" }}
          >
            <Form.Item
              name="medic"
              label="Especialista"
              rules={[
                {
                  required: true,
                  message: "Por favor, elija un especialista"
                }
              ]}
            >
              <Select
                showSearch
                size="large"
                style={{ width: 200 }}
                placeholder="Especialista"
                optionFilterProp="children"
                filterOption={(input, option) => {
                  if (option && option.children) {
                    return (
                      option.children
                        .toString()
                        .toLowerCase()
                        .indexOf(input.toLowerCase()) >= 0
                    )
                  }
                  return false
                }}
                filterSort={(optionA, optionB) => {
                  if (optionA.children && optionB.children) {
                    return optionA.children
                      .toString()
                      .toLowerCase()
                      .localeCompare(optionB.children.toString().toLowerCase())
                  }
                  return 0
                }}
                onChange={onMedicChange}
                loading={!medics}
              >
                {medics &&
                  medics.map((option, index) => (
                    <Option key={index} value={option}>
                      {option}
                    </Option>
                  ))}
              </Select>
            </Form.Item>
            <Row>
              <Space size="large" direction="horizontal">
                <Form.Item
                  label="Fecha"
                  name="date"
                  rules={[
                    {
                      required: true,
                      message: "Fecha no valida"
                    }
                  ]}
                >
                  <DatePicker
                    allowClear
                    size="large"
                    format="DD/MM/YYYY"
                    disabledDate={disabledDates}
                  />
                </Form.Item>
                <Form.Item
                  label="Horario"
                  name="time"
                  rules={[
                    {
                      required: true,
                      message: "Horario no valido"
                    }
                  ]}
                >
                  <TimePicker
                    size="large"
                    allowClear
                    format="HH:mm"
                    minuteStep={5}
                    onChange={(newTime) => {
                      newTime &&
                        detailsForm.setFieldsValue({
                          time: roundTimeToNextFiveSlot(newTime)
                        })
                    }}
                  />
                </Form.Item>
              </Space>
            </Row>
          </Form>
          {current === 2 && <div>Final screen, check data</div>}
        </div>
      </div>
      <div className="steps-action flex--space-between">
        <Button
          size="large"
          style={{ width: "150px" }}
          onClick={prev}
          disabled={current < 1}
        >
          Anterior
        </Button>
        {current < steps.length - 1 && (
          <Button
            size="large"
            style={{ width: "150px" }}
            type="primary"
            onClick={next}
          >
            Siguiente
          </Button>
        )}
        {current === steps.length - 1 && (
          <Button
            size="large"
            style={{ width: "150px" }}
            type="primary"
            onClick={submit}
            loading={isLoading}
          >
            Finalizar
          </Button>
        )}
      </div>
    </Bubble>
  )
}

const roundTimeToNextFiveSlot = (time: Moment) => {
  const remainder = 5 - (time.minute() % 5)
  if (remainder === 0 || remainder === 5) return time

  const dateTime = moment(time).add(remainder, "minutes")

  return dateTime
}
