import { Typography, Collapse, Button, Space } from "antd"
import { PlusOutlined } from "@ant-design/icons"
import { useEffect, useState } from "react"
import { EmrSettingsModal } from "./EmrSettingsModal"
import { addEMR, getEMR } from "./Handler"
import { EmrType } from "./model"
import { errorNotification, successNotification } from "../Notification"

const { Text } = Typography
const { Panel } = Collapse

type EmrProps = {
  id: string
}
export const EMR = ({ id }: EmrProps) => {
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [emr, setEmr] = useState<EmrType>()

  useEffect(() => {
    getEMR(id).then((res) => {
      setEmr(res)
    })
  }, [id])

  const handleOk = (newEMR: any) => {
    setIsModalVisible(false)
    addEMR(id, emr, newEMR)
      .then((res) => {
        successNotification("Historia clinica guardada")
        setEmr(res)
      })
      .catch((e) => {
        errorNotification("Error al guardar la historia clinica")
        console.error(e)
      })
  }

  const handleCancel = () => {
    setIsModalVisible(false)
  }

  return (
    <>
      <Space size="large" direction="vertical">
        <div>
          {emr ? (
            emr.map((hc, index) => (
              <Collapse key={`hc-${index}`}>
                <Panel header={hc.date} key={index}>
                  <Text>{hc.text}</Text>
                </Panel>
              </Collapse>
            ))
          ) : (
            <Text>No hay historias clinicas cargadas</Text>
          )}
        </div>
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
      </Space>

      <EmrSettingsModal
        visible={isModalVisible}
        handleOk={handleOk}
        handleCancel={handleCancel}
      />
    </>
  )
}
