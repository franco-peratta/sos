export const validateInitialStep = (dni: string) => {
  const patients = [
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

  const selectedPatient = patients.filter((patient) => patient.dni === dni)
  return selectedPatient[0]
}
