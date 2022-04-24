import { DatePicker, Form, Input, Modal } from "antd"
import moment, { Moment } from "moment"
import { EmrType } from "./model"

const { TextArea } = Input

type EmrSettingsProps = {
  visible: boolean
  handleOk: () => void
  handleCancel: () => void
  emr?: EmrType
}

export const EmrSettingsModal = ({
  visible,
  handleOk,
  handleCancel,
  emr
}: EmrSettingsProps) => {
  const [form] = Form.useForm()

  const title = emr ? "Editar Historia Clinica" : "Nueva Historia Clinica"

  const disabledDates = (current: Moment) => {
    // Cannot select days before today
    return current && current < moment().startOf("day")
  }

  const submit = () => {
    form
      .validateFields()
      .then(() => {
        console.log(form.getFieldsValue())
        // @TODO call api or do something with the data
        handleOk()
        form.resetFields()
      })
      .catch(() => console.log("error"))
  }

  return (
    <Modal
      title={title}
      visible={visible}
      onOk={submit}
      onCancel={handleCancel}
    >
      <Form form={form} layout="vertical" name="form">
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
          label="Contenido"
          name="text"
          rules={[
            {
              required: true,
              message: "Ingrese algo"
            }
          ]}
        >
          <TextArea showCount maxLength={1024} style={{ height: 120 }} />
        </Form.Item>
      </Form>
    </Modal>
  )
}
