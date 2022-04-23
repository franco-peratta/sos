import { ReactNode, useCallback, useEffect, useState } from "react"
import { Button, Input, Space, Table, Typography } from "antd"
import { EditOutlined, PlusOutlined } from "@ant-design/icons"
import { Bubble } from "../components/Bubble"
import { Patient } from "./model"
import { useNavigate } from "react-router-dom"
import { toPatients } from "./routes"

// See EditableTable in https://ant.design/components/table/

const { Search } = Input
const { Title, Link } = Typography

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
    key: "id",
    title: "ID",
    dataIndex: "id"
  },
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
    render: (_: any, record: Patient) => (
      <Link
        onClick={() => {
          console.log(record)
        }}
      >
        {record.name}
      </Link>
    )
  },
  {
    key: "dni",
    title: "DNI",
    dataIndex: "dni"
  },
  {
    key: "email",
    title: "email",
    dataIndex: "email"
  },
  {
    key: "edit",
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
  const [columns, setColumns] = useState<
    {
      key: string
      title: string
      dataIndex: string
      render?: (...args: any) => ReactNode
    }[]
  >()

  const navigate = useNavigate()

  useEffect(() => {
    setColumns([
      {
        key: "id",
        title: "ID",
        dataIndex: "id"
      },
      {
        title: "Name",
        dataIndex: "name",
        key: "name",
        render: (_: any, record: Patient) => (
          <Link
            onClick={() => {
              navigate(`${toPatients()}/${record.id}`)
            }}
          >
            {record.name}
          </Link>
        )
      },
      {
        key: "dni",
        title: "DNI",
        dataIndex: "dni"
      },
      {
        key: "email",
        title: "email",
        dataIndex: "email"
      },
      {
        key: "edit",
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
    ])
  }, [])

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

        <Table key="table" dataSource={filteredData} columns={columns} />
      </Space>
    </Bubble>
  )
}
