import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import moment, { Moment } from "moment"
import {
  Input,
  Typography,
  DatePicker,
  TimePicker,
  Row,
  Space,
  Button,
  Select
} from "antd"
import { CloseOutlined } from "@ant-design/icons"
import { toAppointments } from "./routes"
import { Bubble } from "../components/Bubble"
import "./styles.less"

const { Option } = Select

const { Title } = Typography

export const NewAppointment = () => {
  const [name, setName] = useState("")
  const [lastName, setLastName] = useState("")
  const [email, setEmail] = useState("")
  const [idNumber, setIdNumber] = useState("")
  const [date, setDate] = useState(moment())
  const [time, setTime] = useState(roundTimeToNextFiveSlot(moment()))
  const [options, setOptions] = useState([""])

  useEffect(() => {
    setOptions(["Cami", "Marcos", "Lucrecia"])
  }, [])

  const navigate = useNavigate()

  const disabledDates = (current: Moment) => {
    // Can not select days before today
    return current && current < moment().startOf("day")
  }

  return (
    <>
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

        <div className="form">
          <Input
            allowClear
            value={name}
            size="large"
            placeholder="Nombre"
            onChange={(e) => setName(e.target.value)}
          />
          <Input
            allowClear
            value={lastName}
            size="large"
            placeholder="Apellido"
            onChange={(e) => setLastName(e.target.value)}
          />
          <Input
            allowClear
            value={email}
            size="large"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            allowClear
            value={idNumber}
            type="number"
            size="large"
            placeholder="Numero de documento / ID"
            maxLength={10}
            onChange={(e) => setIdNumber(e.target.value)}
          />
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
          >
            {options.map((option, index) => (
              <Option key={index} value={index}>
                {option}
              </Option>
            ))}
          </Select>

          <Row>
            <Space direction="horizontal">
              <DatePicker
                allowClear
                size="large"
                format="DD/MM/YYYY"
                value={date}
                onChange={(newDate) => {
                  newDate && setDate(newDate)
                }}
                disabledDate={disabledDates}
              />
              <TimePicker
                size="large"
                allowClear
                format="HH:mm"
                value={time}
                minuteStep={5}
                onChange={(newTime) => {
                  newTime && setTime(roundTimeToNextFiveSlot(newTime))
                }}
              />
            </Space>
          </Row>
          <Row>
            <Button type="primary" size="large">
              Crear Turno
            </Button>
          </Row>
        </div>
      </Bubble>
    </>
  )
}

const roundTimeToNextFiveSlot = (time: Moment) => {
  const remainder = 5 - (time.minute() % 5)
  if (remainder === 0) return time

  const dateTime = moment(time).add(remainder, "minutes")

  return dateTime
}
