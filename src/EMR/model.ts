import { Moment } from "moment"

type EmrContent = {
  date: Moment
  text: string
}

export type EmrType = {
  id: string
  data: EmrContent[]
}
