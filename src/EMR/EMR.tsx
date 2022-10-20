import { Space, Button } from "antd"
import { useEffect, useState } from "react"
import { getEMR, setEMR } from "./Handler"
import { EmrType } from "./model"

import { RichTextEditor } from "../UI/RichTextEditor"
import { successNotification } from "../Notification"

type EmrProps = {
  patientId: string
}
export const EMR = ({ patientId }: EmrProps) => {
  const [emr, setEmrState] = useState<EmrType>("")
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    getEMR(patientId).then((res) => {
      setEmrState(res ? res : "")
    })
  }, [patientId])

  const handleSave = async () => {
    setLoading(true)
    await setEMR(patientId, emr)
    setLoading(false)
    successNotification("Historia clinica actualizada")
  }

  return (
    <>
      <Space size="large" direction="vertical">
        <div>
          <RichTextEditor value={emr} onChange={setEmrState} />
        </div>
        <Button type="primary" onClick={handleSave} loading={loading}>
          Guardar
        </Button>
      </Space>
    </>
  )
}
