import { ReactNode } from "react"
import "./styles.less"
type Props = {
  children: ReactNode
}
export const Bubble = ({ children }: Props) => {
  return <div className="bubble">{children}</div>
}
