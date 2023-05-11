import { http } from "../http"
import { EmrType } from "./model"
import { Patient } from "../Patients/model"

export const updateEMR = async (patientId: string, emr: EmrType) => {
  return http<Patient>("PATCH", `/patient/${patientId}/emr`, {
    params: {
      emr
    }
  })
}
