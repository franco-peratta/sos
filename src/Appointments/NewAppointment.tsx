import { useCallback, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import moment, { Moment } from "moment"
import {
  Form,
  Input,
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
import { validateInitialStep } from "./Handler"
import "./styles.less"

const { Option } = Select
const { Title } = Typography
const { Step } = Steps

const steps = ["Ingresar DNI", "Elegir fecha", "Validar datos"]

export const NewAppointment = () => {
  const [idForm] = Form.useForm()
  const [detailsForm] = Form.useForm()

  const [current, setCurrent] = useState(0)
  const [options, setOptions] = useState(["Cami", "Marcos", "Lucrecia"])

  const navigate = useNavigate()

  const next = useCallback(() => {
    if (current === 0) {
      const patient = validateInitialStep(idForm.getFieldValue("id"))
      // @TODO do something with this patient. check if it exits or not
      console.log(patient)
      idForm
        .validateFields()
        .then(() => setCurrent(current + 1))
        .catch(() => {})
    }
    if (current === 1) {
      detailsForm
        .validateFields()
        .then(() => setCurrent(current + 1))
        .catch(() => {})
    }
  }, [idForm, detailsForm, current])

  const prev = () => {
    setCurrent(current - 1)
  }

  const submit = () => {
    console.log(idForm.getFieldsValue())
    console.log(detailsForm.getFieldsValue())
  }

  const disabledDates = (current: Moment) => {
    // Can not select days before today
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
              name="id"
              label="Numero de documento / ID"
              rules={[{ required: true, message: "Por favor, ingrese un id" }]}
            >
              <Input
                allowClear
                type="number"
                size="large"
                placeholder="Numero de documento / ID"
                maxLength={10}
              />
            </Form.Item>
          </Form>
          <Form
            form={detailsForm}
            layout="vertical"
            name="details"
            style={{ display: current === 1 ? "inherit" : "none" }}
          >
            <Form.Item
              name="name"
              label="Nombre"
              rules={[
                { required: true, message: "Por favor, ingrese su nombre" }
              ]}
            >
              <Input allowClear size="large" placeholder="Nombre" />
            </Form.Item>
            <Form.Item
              name="lastname"
              label="Apellido"
              rules={[
                {
                  required: true,
                  message: "Por favor, ingrese su apellido"
                }
              ]}
            >
              <Input allowClear size="large" placeholder="Apellido" />
            </Form.Item>
            <Form.Item
              name="email"
              label="Correo Electronico"
              rules={[
                {
                  type: "email",
                  message: "La direccion de correo electronico no es valida"
                },
                {
                  required: true,
                  message:
                    "Por favor, ingrese su direccion de correo electronico"
                }
              ]}
            >
              <Input allowClear size="large" placeholder="ejemplo@email.com" />
            </Form.Item>
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
              >
                {options.map((option, index) => (
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
