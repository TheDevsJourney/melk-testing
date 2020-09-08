import React from "react"
import Layout from "../components/Layout"

const productTemplate = ({ data: { stripePrice } }) => {
  return (
    <Layout>
      <h1>{stripePrice.product.name}</h1>
      <p>{stripePrice.product.description}</p>
      {/* Use gatsby image */}
      <img src={`${stripePrice.product.images}`} alt="" height="250" />
    </Layout>
  )
}

export const query = graphql`
  query singleProductQuery($id: String!) {
    stripePrice(id: { eq: $id }) {
      active
      product {
        name
        description
        images
      }
      unit_amount
      id
      currency
    }
  }
`

export default productTemplate
