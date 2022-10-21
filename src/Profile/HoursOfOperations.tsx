import { Checkbox, Col, Form, Row, TimePicker, Typography } from "antd"
import { User } from "../Auth/Model"

const { Title } = Typography

type Props = {
  user: User
}
export const HoursOfOperations = ({ user }: Props) => {
  const [form] = Form.useForm()

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
        <Row style={{ marginBottom: "1em", gap: "2em" }}>
          <Col>
            <Title level={4}>Lunes</Title>
            <TimePicker.RangePicker format="HH" />
          </Col>
          <Col>
            <Title level={4}>Martes</Title>
            <TimePicker.RangePicker format="HH" />
          </Col>
          <Col>
            <Title level={4}>Miercoles</Title>
            <TimePicker.RangePicker format="HH" />
          </Col>
          <Col>
            <Title level={4}>Jueves</Title>
            <TimePicker.RangePicker format="HH" />
          </Col>
        </Row>
        <Row style={{ gap: "2em" }}>
          <Col>
            <Title level={4}>Viernes</Title>
            <TimePicker.RangePicker format="HH" />
          </Col>
          <Col>
            <Title level={4}>Sabado</Title>
            <TimePicker.RangePicker format="HH" />
          </Col>
          <Col>
            <Title level={4}>Domingo</Title>
            <TimePicker.RangePicker format="HH" />
          </Col>
        </Row>
      </Form>
    </>
  )
}

/*
 <Form.Item name="checkbox-group" label="Checkbox.Group">
        <Checkbox.Group>
          <Row>
            <Col >
              <Checkbox value="A" style={{ lineHeight: '32px' }}>
                A
              </Checkbox>
            </Col>
            <Col >
              <Checkbox value="B" style={{ lineHeight: '32px' }} disabled>
                B
              </Checkbox>
            </Col>
            <Col >
              <Checkbox value="C" style={{ lineHeight: '32px' }}>
                C
              </Checkbox>
            </Col>
            <Col >
              <Checkbox value="D" style={{ lineHeight: '32px' }}>
                D
              </Checkbox>
            </Col>
            <Col >
              <Checkbox value="E" style={{ lineHeight: '32px' }}>
                E
              </Checkbox>
            </Col>
            <Col >
              <Checkbox value="F" style={{ lineHeight: '32px' }}>
                F
              </Checkbox>
            </Col>
          </Row>
        </Checkbox.Group>
      </Form.Item>


*/
