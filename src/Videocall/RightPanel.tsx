import { LeftOutlined, RightOutlined } from "@ant-design/icons"
import { Space, Typography } from "antd"
import { Patient } from "../Patients/model"

const { Title, Paragraph, Text } = Typography

type Props = {
  patientInfo: Patient
  collapsed: boolean
  setCollapsed: (val: boolean) => void
}
export const RightPanel = ({ patientInfo, collapsed, setCollapsed }: Props) => {
  console.log(patientInfo)
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
                Fecha de nacimiento: {patientInfo.dob}
              </Text>
            </Space>
          </div>
        )}
      </div>
    </>
  )
}
