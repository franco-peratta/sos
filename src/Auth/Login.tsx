import { Button, Form, Input, Layout, Typography, Image } from "antd"
import { useState } from "react"
import { signIn } from "."

const { Text } = Typography

export const LoginPage = () => {
  const [error, setError] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const onFinish = () => {
    signIn(email, password)
      .then((user) => {
        console.log({ user })
      })
      .catch(() => {
        console.log("No me loguie un carajo")
        setError(true)
      })
  }

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo)
  }

  return (
    <Layout.Content
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100vw",
        height: "100vh"
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "2em",
          padding: "2.5em",
          border: "1px solid black",
          alignItems: "center"
        }}
      >
        <Image
          src="/img/sos-logo.png"
          alt="Salud Online Solidaria"
          preview={false}
        />
        {error && <Text type="danger">Credenciales Invalidas</Text>}
        <Form
          style={{ width: "max(25vw, 300px)" }}
          layout="vertical"
          name="basic"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            label="Email"
            name="email"
            rules={[{ required: true, message: "Por favor ingrese su email!" }]}
          >
            <Input value={email} onChange={(e) => setEmail(e.target.value)} />
          </Form.Item>

          <Form.Item
            label="Contraseña"
            name="password"
            rules={[
              { required: true, message: "Por favor ingrese su contraseña" }
            ]}
          >
            <Input.Password
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit">
              Iniciar Sesion
            </Button>
          </Form.Item>
        </Form>
      </div>
    </Layout.Content>
  )
}
