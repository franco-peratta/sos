import React from "react"
import { render } from "react-dom"
import { RootComponent } from "./Init"
import "./index.less"

export const renderApp = () =>
  render(
    <React.StrictMode>
      <RootComponent />
    </React.StrictMode>,
    document.getElementById("root")
  )

renderApp()
