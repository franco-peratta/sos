import { Col, Form, Row, Space, TimePicker, Typography } from "antd"
import { User } from "../Auth/Model"

const { Title } = Typography

type Shifts = {
  monday: {
    available: boolean
    shifts: { from: number; to: number }[]
  }
  tuesday: {
    available: boolean
    shifts: { from: number; to: number }[]
  }
  wednesday: {
    available: boolean
    shifts: { from: number; to: number }[]
  }
  thursday: {
    available: boolean
    shifts: { from: number; to: number }[]
  }
  friday: {
    available: boolean
    shifts: { from: number; to: number }[]
  }
}
type Profile = {
  name: string
  email: string
  phoneNumber: string
}

const shift: Shifts = {
  monday: {
    available: true,
    shifts: [{ from: 8, to: 12 }]
  },
  tuesday: {
    available: true,
    shifts: [{ from: 8, to: 12 }]
  },
  wednesday: {
    available: true,
    shifts: [{ from: 8, to: 12 }]
  },
  thursday: {
    available: true,
    shifts: [{ from: 8, to: 12 }]
  },
  friday: {
    available: true,
    shifts: [{ from: 8, to: 12 }]
  }
}

type Props = {
  user: User
}
export const HoursOfOperations = ({ user }: Props) => {
  const [form] = Form.useForm<Profile & Shifts>()

  return (
    <>
      <Title>Horas disponbles</Title>
      <Form
        form={form}
        initialValues={{
          name: user.name,
          email: user.email,
          phoneNumber: user.phoneNumber
        }}
      >
        {shift.monday.available ? (
          <Row style={{ marginBottom: "1em" }}>
            <Col span={3}>
              <Title level={4}>Lunes</Title>
            </Col>
            <Space>
              {shift.monday.shifts.map((slot, i) => (
                <div key={`monday-slot-${i}`}>
                  <TimePicker.RangePicker format="HH" />
                </div>
              ))}
            </Space>
          </Row>
        ) : null}
        {shift.tuesday.available ? (
          <Row style={{ marginBottom: "1em" }}>
            <Col span={3}>
              <Title level={4}>Martes</Title>
            </Col>
            <Space>
              {shift.tuesday.shifts.map((slot, i) => (
                <div key={`tuesday-slot-${i}`}>
                  <TimePicker.RangePicker format="HH" />
                </div>
              ))}
            </Space>
          </Row>
        ) : null}
        {shift.wednesday.available ? (
          <Row style={{ marginBottom: "1em" }}>
            <Col span={3}>
              <Title level={4}>Miercoles</Title>
            </Col>
            <Space>
              {shift.wednesday.shifts.map((slot, i) => (
                <div key={`wednesday-slot-${i}`}>
                  <TimePicker.RangePicker format="HH" />
                </div>
              ))}
            </Space>
          </Row>
        ) : null}
        {shift.thursday.available ? (
          <Row style={{ marginBottom: "1em" }}>
            <Col span={3}>
              <Title level={4}>Jueves</Title>
            </Col>
            <Space>
              {shift.thursday.shifts.map((slot, i) => (
                <div key={`thursday-slot-${i}`}>
                  <TimePicker.RangePicker format="HH" />
                </div>
              ))}
            </Space>
          </Row>
        ) : null}
        {shift.friday.available ? (
          <Row style={{ marginBottom: "1em" }}>
            <Col span={3}>
              <Title level={4}>Viernes</Title>
            </Col>
            <Space>
              {shift.friday.shifts.map((slot, i) => (
                <div key={`friday-slot-${i}`}>
                  <TimePicker.RangePicker format="HH" />
                </div>
              ))}
            </Space>
          </Row>
        ) : null}
      </Form>
    </>
  )
}
