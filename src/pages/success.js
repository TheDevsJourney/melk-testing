import React from "react"
import Layout from "../components/Layout"
import Success from "../components/Success"

// Perhaps on this page we would updateProducts of the items in the cart after returning after a successful charge.
// Then remove all items from cart.

const success = () => {
  return (
    <Layout>
      <h1>Success!</h1>
      <Success />
    </Layout>
  )
}

export default success
