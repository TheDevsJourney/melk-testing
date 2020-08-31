import React from "react"

export default function Layout({ children }) {
  return (
    <div>
      <header style={{ backgroundColor: "blue" }}>This is the header</header>
      {children}
    </div>
  )
}
