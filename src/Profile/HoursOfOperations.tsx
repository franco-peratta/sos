import { Button, Checkbox, Col, Row, Space, TimePicker, Typography } from "antd"
import moment, { Moment } from "moment"
import { PlusOutlined, DeleteOutlined } from "@ant-design/icons"
import { User } from "../Auth/Model"

const { Title } = Typography

type Day = "monday" | "tuesday" | "wednesday" | "thursday" | "friday"

type Props = {
  user: User
  setUser: Function
}
export const HoursOfOperations = ({ user, setUser }: Props) => {
  const onChange = (value: any, day: Day, index: number) => {
    const a: Moment = value[0]
    const b: Moment = value[1]

    const newUser = { ...user }
    newUser.shifts[day].shifts[index].from = a.hour()
    newUser.shifts[day].shifts[index].to = b.hour()
    setUser(newUser)
  }

  const onChecked = (day: Day) => {
    const newUser = { ...user }
    newUser.shifts[day].available = !newUser.shifts[day].available
    setUser(newUser)
  }

  const addShift = (day: Day) => {
    const newUser: User = { ...user }
    newUser.shifts[day].shifts.push({ from: 8, to: 12 })
    setUser(newUser)
  }

  const deleteShift = (day: Day) => {
    const newUser: User = { ...user }
    newUser.shifts[day].shifts.length > 1 && newUser.shifts[day].shifts.pop()
    setUser(newUser)
  }

  return (
    <>
      <Title>Horas disponbles</Title>
      <Row style={{ marginBottom: "1em" }}>
        <Col span={3}>
          <Checkbox
            defaultChecked={user.shifts.monday.available}
            onChange={() => onChecked("monday")}
          >
            <Title level={4}>Lunes</Title>
          </Checkbox>
        </Col>
        <Col span={6}>
          <Space direction="vertical">
            {user.shifts.monday.shifts.map((slot, i) => (
              <div key={`monday-slot-${i}`}>
                <TimePicker.RangePicker
                  format="HH"
                  defaultValue={[
                    moment(slot.from, "HH"),
                    moment(slot.to, "HH")
                  ]}
                  disabled={!user.shifts.monday.available}
                  onChange={(e) => onChange(e, "monday", i)}
                />
              </div>
            ))}
          </Space>
        </Col>
        <Col span={3}>
          <Button
            type="text"
            onClick={() => addShift("monday")}
            disabled={!user.shifts.monday.available}
          >
            <PlusOutlined />
          </Button>
          {user.shifts.monday.shifts.length > 1 ? (
            <Button
              type="text"
              onClick={() => deleteShift("monday")}
              disabled={!user.shifts.monday.available}
            >
              <DeleteOutlined />
            </Button>
          ) : null}
        </Col>
      </Row>
      <Row style={{ marginBottom: "1em" }}>
        <Col span={3}>
          <Checkbox
            defaultChecked={user.shifts.tuesday.available}
            onChange={() => onChecked("tuesday")}
          >
            <Title level={4}>Martes</Title>
          </Checkbox>
        </Col>
        <Col span={6}>
          <Space direction="vertical">
            {user.shifts.tuesday.shifts.map((slot, i) => (
              <div key={`tuesday-slot-${i}`}>
                <TimePicker.RangePicker
                  format="HH"
                  defaultValue={[
                    moment(slot.from, "HH"),
                    moment(slot.to, "HH")
                  ]}
                  disabled={!user.shifts.tuesday.available}
                />
              </div>
            ))}
          </Space>
        </Col>
        <Col span={3}>
          <Button
            type="text"
            onClick={() => addShift("tuesday")}
            disabled={!user.shifts.tuesday.available}
          >
            <PlusOutlined />
          </Button>
          {user.shifts.tuesday.shifts.length > 1 ? (
            <Button
              type="text"
              onClick={() => deleteShift("tuesday")}
              disabled={!user.shifts.tuesday.available}
            >
              <DeleteOutlined />
            </Button>
          ) : null}
        </Col>
      </Row>
      <Row style={{ marginBottom: "1em" }}>
        <Col span={3}>
          <Checkbox
            defaultChecked={user.shifts.wednesday.available}
            onChange={() => onChecked("wednesday")}
          >
            <Title level={4}>Miercoles</Title>
          </Checkbox>
        </Col>
        <Col span={6}>
          <Space direction="vertical">
            {user.shifts.wednesday.shifts.map((slot, i) => (
              <div key={`wednesday-slot-${i}`}>
                <TimePicker.RangePicker
                  format="HH"
                  defaultValue={[
                    moment(slot.from, "HH"),
                    moment(slot.to, "HH")
                  ]}
                  disabled={!user.shifts.wednesday.available}
                />
              </div>
            ))}
          </Space>
        </Col>
        <Col span={3}>
          <Button
            type="text"
            onClick={() => addShift("wednesday")}
            disabled={!user.shifts.wednesday.available}
          >
            <PlusOutlined />
          </Button>
          {user.shifts.wednesday.shifts.length > 1 ? (
            <Button
              type="text"
              onClick={() => deleteShift("wednesday")}
              disabled={!user.shifts.wednesday.available}
            >
              <DeleteOutlined />
            </Button>
          ) : null}
        </Col>
      </Row>
      <Row style={{ marginBottom: "1em" }}>
        <Col span={3}>
          <Checkbox
            defaultChecked={user.shifts.thursday.available}
            onChange={() => onChecked("thursday")}
          >
            <Title level={4}>Jueves</Title>
          </Checkbox>
        </Col>
        <Col span={6}>
          <Space direction="vertical">
            {user.shifts.thursday.shifts.map((slot, i) => (
              <div key={`thursday-slot-${i}`}>
                <TimePicker.RangePicker
                  format="HH"
                  defaultValue={[
                    moment(slot.from, "HH"),
                    moment(slot.to, "HH")
                  ]}
                  disabled={!user.shifts.thursday.available}
                />
              </div>
            ))}
          </Space>
        </Col>
        <Col span={3}>
          <Button
            type="text"
            onClick={() => addShift("thursday")}
            disabled={!user.shifts.thursday.available}
          >
            <PlusOutlined />
          </Button>
          {user.shifts.thursday.shifts.length > 1 ? (
            <Button
              type="text"
              onClick={() => deleteShift("thursday")}
              disabled={!user.shifts.thursday.available}
            >
              <DeleteOutlined />
            </Button>
          ) : null}
        </Col>
      </Row>
      <Row style={{ marginBottom: "1em" }}>
        <Col span={3}>
          <Checkbox
            defaultChecked={user.shifts.friday.available}
            onChange={() => onChecked("friday")}
          >
            <Title level={4}>Viernes</Title>
          </Checkbox>
        </Col>
        <Col span={6}>
          <Space direction="vertical">
            {user.shifts.friday.shifts.map((slot, i) => (
              <div key={`friday-slot-${i}`}>
                <TimePicker.RangePicker
                  format="HH"
                  defaultValue={[
                    moment(slot.from, "HH"),
                    moment(slot.to, "HH")
                  ]}
                  disabled={!user.shifts.friday.available}
                />
              </div>
            ))}
          </Space>
        </Col>
        <Col span={3}>
          <Button
            type="text"
            onClick={() => addShift("friday")}
            disabled={!user.shifts.friday.available}
          >
            <PlusOutlined />
          </Button>
          {user.shifts.friday.shifts.length > 1 ? (
            <Button
              type="text"
              onClick={() => deleteShift("friday")}
              disabled={!user.shifts.friday.available}
            >
              <DeleteOutlined />
            </Button>
          ) : null}
        </Col>
      </Row>
    </>
  )
}
