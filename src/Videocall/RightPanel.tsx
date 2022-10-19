import { LeftOutlined, RightOutlined } from "@ant-design/icons"
import { Space, Typography, Divider, List, Modal } from "antd"

import { useState } from "react"
import { EmrContent } from "../EMR/model"

import { Patient } from "../Patients/model"

const { Title, Text, Link, Paragraph } = Typography

const getAge = (dob: string) => {
  const splittedDate = dob.split("/")
  const birthday = new Date(
    +splittedDate[2],
    +splittedDate[1] - 1,
    +splittedDate[0]
  )

  const ageDifMs = Date.now() - birthday.getTime()
  const ageDate = new Date(ageDifMs)
  return Math.abs(ageDate.getUTCFullYear() - 1970)
}

type Props = {
  patientInfo: Patient
  collapsed: boolean
  setCollapsed: (val: boolean) => void
}
export const RightPanel = ({ patientInfo, collapsed, setCollapsed }: Props) => {
  console.log(patientInfo)
  const [selectedEmr, setSelectedEmr] = useState<EmrContent>()

  const onOk = () => {
    setSelectedEmr(undefined)
  }

  const onCancel = () => {
    setSelectedEmr(undefined)
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
              <List
                header={<div>Historia Clinica</div>}
                bordered
                dataSource={patientInfo.emr}
                itemLayout="vertical"
                renderItem={(emr) => (
                  <List.Item
                    onClick={() => {
                      setSelectedEmr(emr)
                    }}
                  >
                    <Link strong>{emr.date}</Link>
                  </List.Item>
                )}
              />
            </div>
          </div>
        )}
      </div>
      <EmrModal
        patient={patientInfo}
        visible={!!selectedEmr}
        data={selectedEmr}
        edit={false}
        onOk={onOk}
        onCancel={onCancel}
      />
    </>
  )
}

type ModalProps = {
  patient: Patient
  edit: boolean
  visible: boolean
  data?: EmrContent
  onOk: () => void
  onCancel: () => void
}
const EmrModal = ({ edit, visible, data, onOk, onCancel }: ModalProps) => {
  console.log({ myData: data })

  const ModalTitle = () => (
    <div style={{ display: "flex", justifyContent: "space-between" }}>
      <Title level={4} style={{ margin: 0 }}>
        {data?.date}
      </Title>
      {/* <span style={{ paddingRight: "3em" }}>boton</span> */}
    </div>
  )

  return (
    <Modal
      title={<ModalTitle />}
      visible={visible}
      onOk={onOk}
      onCancel={onCancel}
    >
      <Paragraph>{data?.text}</Paragraph>
    </Modal>
  )
}
