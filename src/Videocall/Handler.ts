export const checkPatientIdAndAppId = async (
  patientId: string,
  appointmentId: string
) => {
  return {
    id: "1",
    name: "Juan",
    email: "",
    appointment: {
      id: "1",
      date: new Date(),
      status: "pendiente",
      patientId: "1",
      doctorId: "1",
      doctorName: "Juan",
      doctorEmail: ""
    }
  }
}
