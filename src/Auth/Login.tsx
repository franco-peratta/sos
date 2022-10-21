import { Button, Form, Input, Layout, Image, Typography } from "antd"
import { useState } from "react"
// import { useNavigate } from "react-router"
import { register, signIn } from "../firebase/auth"
import { errorNotification } from "../Notification"
import { addProvider } from "./Handler"

const { Text, Link } = Typography

const emailRegex =
  // eslint-disable-next-line no-control-regex
  /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/

type FormT = {
  email: string
  password: string
  password2: string
}
export const LoginPage = () => {
  const [form] = Form.useForm<FormT>()
  // const navigate = useNavigate()

  const [mode, setMode] = useState<"login" | "register">("login")
  const [loading, setLoading] = useState(false)

  const onFinish = () => {
    setLoading(true)
    form
      .validateFields()
      .then(({ email, password, password2 }) => {
        if (mode === "login") {
          signIn(email, password)
            .catch((err) => {
              errorNotification("Datos invalidos")
            })
            .finally(() => setLoading(false))
        } else {
          if (password !== password2) {
            errorNotification("Las contraseñas no coinciden")
            setLoading(false)
            return
          }
          register(email, password)
            .then(({ user }) => {
              console.log(user.uid)
              console.log(user.email)
              addProvider(user).then(() => {
                // navigate(`/perfil/${user.uid}`)
              })
            })
            .catch((err) => {
              if (err.code === "auth/email-already-in-use")
                errorNotification("El mail ya esta en uso")
              else errorNotification("Hubo un problema al registrarse")
            })
            .finally(() => setLoading(false))
        }
      })
      .catch((err) => {
        setLoading(false)
        console.log("error")
        console.error(err)
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

        <Form
          form={form}
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
            rules={[
              {
                required: true,
                message: "Ingrese un email valido",
                pattern: emailRegex
              }
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Contraseña"
            name="password"
            rules={[
              { required: true, message: "Por favor ingrese su contraseña" }
            ]}
          >
            <Input.Password />
          </Form.Item>

          {mode === "register" && (
            <Form.Item
              label="Repita su Contraseña"
              name="password2"
              rules={[
                { required: true, message: "Por favor ingrese su contraseña" }
              ]}
            >
              <Input.Password />
            </Form.Item>
          )}

          <Form.Item>
            <Button
              type="primary"
              shape="round"
              htmlType="submit"
              loading={loading}
              style={{ marginTop: "1em", height: "3em", width: "100%" }}
            >
              {mode === "login" ? "Iniciar Sesion" : "Registrarse"}
            </Button>
            <br />
            <br />
            {mode === "login" && (
              <>
                <Text>No eres miembro? </Text>
                <Link onClick={() => setMode("register")}>Registrese</Link>
              </>
            )}
            {mode === "register" && (
              <>
                <Link onClick={() => setMode("login")}>
                  Volver a Iniciar Sesion
                </Link>
              </>
            )}
          </Form.Item>
        </Form>
      </div>
    </Layout.Content>
  )
}
