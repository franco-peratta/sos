import { EmrType } from "../EMR/model"

export type Patient = {
  id: string
  name: string
  dni: string
  email: string
  emr?: EmrType
}
