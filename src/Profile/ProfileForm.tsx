import { Form, Input, Typography } from "antd"
import { User } from "../Auth/Model"

const { Title } = Typography
type Props = {
  user: User
}
export const ProfileForm = ({ user }: Props) => {
  const [form] = Form.useForm()

  return (
    <>
      <Title>Perfil</Title>
      <Form
        form={form}
        layout="vertical"
        initialValues={{
          name: user.name,
          email: user.email,
          phoneNumber: user.phoneNumber
        }}
      >
        <Form.Item name="name" label="Nombre" required>
          <Input placeholder="Nombre" />
        </Form.Item>
        <Form.Item name="email" label="Email" required>
          <Input placeholder="Email" />
        </Form.Item>
        <Form.Item name="phoneNumber" label="Numero de telefono" required>
          <Input placeholder="+54 (011) 5555555" />
        </Form.Item>
      </Form>
    </>
  )
}
