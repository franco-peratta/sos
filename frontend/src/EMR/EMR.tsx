import { Typography, Collapse, Button, Space, Modal } from "antd"
import { PlusOutlined } from "@ant-design/icons"
import { EmrType } from "./model"
import { useState } from "react"
import { EmrSettingsModal } from "./EmrSettingsModal"

const { Text } = Typography
const { Panel } = Collapse

type EmrProps = {
  emr?: EmrType
}
export const EMR = ({ emr }: EmrProps) => {
  const [isModalVisible, setIsModalVisible] = useState(false)

  if (!emr) return <Text>No hay historias clinicas cargadas</Text>

  const handleOk = () => {
    setIsModalVisible(false)
  }

  const handleCancel = () => {
    setIsModalVisible(false)
  }

  return (
    <>
      <Space size="large" direction="vertical">
        <div className="flex--end">
          <Button
            onClick={() => setIsModalVisible(true)}
            type="default"
            size="large"
          >
            <Space direction="horizontal">
              <PlusOutlined />
              A&ntilde;adir Historia Clinica
            </Space>
          </Button>
        </div>
        <div>
          {emr.data.map((hc, index) => (
            <Collapse key={`hc-${index}`}>
              <Panel header={hc.date.format("DD/MM/YYYY")} key={index}>
                <Text>{hc.text}</Text>
              </Panel>
            </Collapse>
          ))}
        </div>
      </Space>

      <EmrSettingsModal
        visible={isModalVisible}
        handleOk={handleOk}
        handleCancel={handleCancel}
      />
    </>
  )
}
