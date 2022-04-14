import { useCallback, useState } from "react"
import { Button, Input, Space, Table, Typography } from "antd"
import { EditOutlined, PlusOutlined } from "@ant-design/icons"
import { Bubble } from "../components/Bubble"
import { Patient } from "./model"

// See EditableTable in https://ant.design/components/table/

const { Search } = Input
const { Title } = Typography

const dataSource = [
  {
    id: "1",
    name: "Mike",
    dni: "1",
    email: "fperatta@teladoc.com"
  },
  {
    id: "2",
    name: "Homer",
    dni: "2",
    email: "homer@gmail.com"
  },
  {
    id: "3",
    name: "Paco",
    dni: "3",
    email: "paco@gmail.com"
  },
  {
    id: "4",
    name: "Joel",
    dni: "4",
    email: "joel@gmail.com"
  },
  {
    id: "5",
    name: "Mendi",
    dni: "5",
    email: "mendi@gmail.com"
  },
  {
    id: "6",
    name: "Claxton",
    dni: "6",
    email: "claxton@gmail.com"
  },
  {
    id: "7",
    name: "Andy",
    dni: "7",
    email: "andy@gmail.com"
  }
]

const tableColumns = [
  {
    title: "ID",
    dataIndex: "id",
    key: "id"
  },
  {
    title: "Name",
    dataIndex: "name",
    key: "name"
  },
  {
    title: "DNI",
    dataIndex: "dni",
    key: "dni"
  },
  {
    title: "email",
    dataIndex: "email",
    key: "email"
  },
  {
    title: "",
    dataIndex: "edit",
    render: (_: any, record: Patient) => {
      return (
        <div className="icon--hovered">
          <EditOutlined
            style={{ fontSize: "1.5em" }}
            onClick={() => {
              console.log(record)
              alert("te lleva a la pantalla de editar pacientes (WIP)")
            }}
          />
        </div>
      )
    }
  }
]

export const Patients = () => {
  const [data] = useState(dataSource)
  const [filteredData, setFilteredData] = useState(dataSource)
  const [columns] = useState(tableColumns)

  const onSearch = useCallback(
    (value: string) => {
      if (!value) setFilteredData(data)

      const newData: typeof data = data.filter(
        ({ name, dni }) =>
          name.toLowerCase().includes(value.toLowerCase()) ||
          dni.includes(value)
      )
      setFilteredData(newData)
    },
    [data, filteredData]
  )

  return (
    <Bubble>
      <Space size="large" direction="vertical" style={{ width: "100%" }}>
        <div className="flex--space-between">
          <Title>Pacientes</Title>
          <Button onClick={() => {}} type="default" size="large">
            <Space direction="horizontal">
              <PlusOutlined />
              Crear paciente
            </Space>
          </Button>
        </div>

        <Search
          size="large"
          placeholder="Buscar"
          allowClear
          onSearch={onSearch}
        />
        <Table dataSource={filteredData} columns={columns} />
      </Space>
    </Bubble>
  )
}
