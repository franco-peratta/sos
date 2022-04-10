import { EditOutlined } from "@ant-design/icons"
import { Input, Space, Table, Typography } from "antd"
import { useCallback, useState } from "react"
import { Bubble } from "../components/Bubble"
import { Patient } from "./model"

// See EditableTable in https://ant.design/components/table/

const { Search } = Input
const { Title } = Typography

const dataSource = [
  {
    key: "1",
    id: "1",
    name: "Mike",
    dni: "38919769",
    email: "fperatta@teladoc.com"
  },
  {
    key: "2",
    id: "2",
    name: "Homer",
    dni: "38919769",
    email: "homer@gmail.com"
  },
  {
    key: "3",
    id: "3",
    name: "Paco",
    dni: "38919769",
    email: "paco@gmail.com"
  },
  {
    key: "4",
    id: "4",
    name: "Joel",
    dni: "38919769",
    email: "joel@gmail.com"
  },
  {
    key: "5",
    id: "5",
    name: "Mendi",
    dni: "38919769",
    email: "mendi@gmail.com"
  },
  {
    key: "6",
    id: "6",
    name: "Claxton",
    dni: "38919769",
    email: "claxton@gmail.com"
  },
  {
    key: "7",
    id: "7",
    name: "Andy",
    dni: "38919769",
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
        <Title>Pacientes</Title>
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
