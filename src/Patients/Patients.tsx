import { ReactNode, useEffect, useState } from "react"
import { Button, Input, Space, Table, Typography } from "antd"
import { EditOutlined, PlusOutlined } from "@ant-design/icons"
import { Bubble } from "../components/Bubble"
import { Patient } from "./model"
import { useNavigate } from "react-router-dom"
import { toPatients, toPatientsCreate } from "./routes"
import { getPatients } from "./Handler"

// See EditableTable in https://ant.design/components/table/

const { Search } = Input
const { Title, Link } = Typography

export const Patients = () => {
  const [loading, setLoading] = useState(true)
  const [data, setData] = useState<Patient[]>()
  const [filter, setFilter] = useState("")
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
    getPatients().then((res) => {
      setData(res.data)
      console.log("patients", res.data)
      setLoading(false)
    })
  }, [])

  useEffect(() => {
    const columnsSchema = [
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
    ]
    setColumns(columnsSchema)
  }, [navigate])

  const filteredData = data?.filter((item) =>
    item.name.toLowerCase().includes(filter.toLowerCase())
  )

  return (
    <Bubble>
      <Space size="large" direction="vertical" style={{ width: "100%" }}>
        <div className="flex--space-between">
          <Title>Pacientes</Title>
          <Button
            onClick={() => {
              navigate(toPatientsCreate())
            }}
            type="default"
            size="large"
          >
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
          onSearch={setFilter}
        />

        <Table
          key="patients-table"
          rowKey={(row) => row.id}
          dataSource={filteredData}
          columns={columns}
          loading={loading}
        />
      </Space>
    </Bubble>
  )
}
