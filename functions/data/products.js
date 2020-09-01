import React from "react"
import { graphql, StaticQuery } from "gatsby"

let productData

export default props => (
  <StaticQuery
    query={graphql`
      query ProductPrices {
        prices: allStripePrice(
          filter: { product: { active: { eq: true } } }
          sort: { fields: [unit_amount] }
        ) {
          edges {
            node {
              id
              active
              currency
              unit_amount
              product {
                id
                name
                metadata {
                  Quantity
                }
                images
              }
            }
          }
        }
      }
    `}
    render={({ prices }) => (
      <>
        {prices.edges.map(({ node: price }) => {
          const newProduct = {
            sku: price.id,
            name: price.product.name,
            price: price.unit_amount,
            currency: price.currency,
            image: price.product.images,
            quantity: price.product.metadata.Quantity,
            active: price.active,
          }
          return (productData = { ...productData, newProduct })
        })}
      </>
    )}
  />
)
