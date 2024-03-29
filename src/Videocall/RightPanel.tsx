import {
  LeftOutlined,
  RightOutlined,
  FileTextOutlined
} from "@ant-design/icons"
import { Space, Typography, Divider, Button, Modal } from "antd"
import { useState } from "react"
import { updateEMR } from "../EMR/Handler"
import { EmrType } from "../EMR/model"
import { RichTextEditor } from "../UI/RichTextEditor"
import { Patient } from "../Patient/model"

const { Title, Text, Link } = Typography

const getAge = (dateString: string): number => {
  const today: Date = new Date()
  const [day, month, year] = dateString.split("/").map(Number)

  // Note: In JavaScript, months are zero-indexed, so we subtract 1 from the month value.
  const birthDate: Date = new Date(year, month - 1, day)

  let age: number = today.getFullYear() - birthDate.getFullYear()
  const birthMonth: number = birthDate.getMonth()
  const currentMonth: number = today.getMonth()

  if (
    currentMonth < birthMonth ||
    (currentMonth === birthMonth && today.getDate() < birthDate.getDate())
  ) {
    age--
  }

  return age
}

type Props = {
  patientInfo: Patient
  collapsed: boolean
  setCollapsed: (val: boolean) => void
  setPatientInfo: (patient: Patient) => void
}
export const RightPanel = ({
  patientInfo,
  setPatientInfo,
  collapsed,
  setCollapsed
}: Props) => {
  const [visible, setVisible] = useState(false)
  const onOk = (emr: EmrType) => {
    setVisible(false)
    const newPatientInfo = { ...patientInfo, emr }
    updateEMR(patientInfo.id, emr).then((res) => {
      setPatientInfo(newPatientInfo)
    })
  }

  const onCancel = () => {
    setVisible(false)
  }

  return (
    <>
      <div className="right-panel">
        {collapsed ? (
          <div className="collapse-container">
            <button
              className="collapse-button"
              onClick={() => setCollapsed(false)}
            >
              <LeftOutlined />
            </button>
          </div>
        ) : (
          <button
            className="collapse-button"
            onClick={() => setCollapsed(true)}
          >
            <RightOutlined />
          </button>
        )}
        {!collapsed && (
          <div className="details">
            <Space direction="vertical">
              <Title className="title">{patientInfo.name}</Title>
              <Text type="secondary">{patientInfo.email}</Text>
              <Text className="dob">
                Fecha de nacimiento: {patientInfo.dob} -{" "}
                {getAge(patientInfo.dob)} años
              </Text>
            </Space>
            <Divider />
            <div>
              <Button
                type="link"
                size="large"
                onClick={() => {
                  setVisible(true)
                }}
              >
                <Link strong>Historia Clinica</Link>
                <FileTextOutlined style={{ marginLeft: ".5em" }} />
              </Button>
            </div>
          </div>
        )}
      </div>
      <EmrModal
        visible={visible}
        data={patientInfo.emr}
        onOk={onOk}
        onCancel={onCancel}
      />
    </>
  )
}

type ModalProps = {
  visible: boolean
  data?: EmrType
  onOk: (emr: string) => void
  onCancel: () => void
}
const EmrModal = ({ visible, data, onOk, onCancel }: ModalProps) => {
  const [value, setValue] = useState(data ? data : "")

  const ModalTitle = () => (
    <div style={{ display: "flex", justifyContent: "space-between" }}>
      <Title level={4} style={{ margin: 0 }}>
        Historia Clinica
      </Title>
    </div>
  )

  return (
    <Modal
      title={<ModalTitle />}
      visible={visible}
      onOk={() => {
        onOk(value)
      }}
      onCancel={onCancel}
      width="50%"
    >
      <RichTextEditor value={value} onChange={setValue} />
    </Modal>
  )
}
