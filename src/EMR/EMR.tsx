import { Typography, Collapse } from "antd"
import { EmrType } from "./model"

const { Text } = Typography
const { Panel } = Collapse

type EmrProps = {
  emr?: EmrType
}

export const EMR = ({ emr }: EmrProps) => {
  if (!emr) return <Text>No hay historias clinicas cargadas</Text>

  return (
    <div>
      {emr.data.map((hc, index) => (
        <Collapse key={`hc-${index}`}>
          <Panel header={hc.date.format("DD/MM/YYYY")} key={index}>
            <Text>{hc.text}</Text>
          </Panel>
        </Collapse>
      ))}
    </div>
  )
}
