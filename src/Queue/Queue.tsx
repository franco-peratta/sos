import { useState } from "react"
import { Calendar, Alert, ConfigProvider } from "antd"
import { Bubble } from "../components/Bubble"
import moment, { Moment } from "moment"
import esES from "antd/lib/locale/es_ES"

export const Queue = () => {
  const [value, setValue] = useState(moment("2022-04-14"))
  const [selectedValue, setSelectedValue] = useState(moment("2022-04-14"))

  const onSelect = (value: Moment) => {
    setValue(value)
    setSelectedValue(value)
  }

  const onPanelChange = (value: Moment) => {
    setValue(value)
  }

  return (
    <Bubble>
      <Alert
        message={`Fecha seleccionada: ${
          selectedValue && selectedValue.format("DD/MM/YYYY")
        }`}
      />
      <ConfigProvider locale={esES}>
        <Calendar
          value={value}
          onSelect={onSelect}
          onPanelChange={onPanelChange}
        />
      </ConfigProvider>
    </Bubble>
  )
}
