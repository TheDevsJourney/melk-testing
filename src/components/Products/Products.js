import React from "react"
import { graphql, StaticQuery } from "gatsby"
import ProductCart from "./ProductCard"

const conatinerStyles = {
  display: "flex",
  flexDirection: "row",
  flexWrap: "wrap",
  justifyContent: "space-between",
  padding: "1rem 0 1rem 0",
}

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
      <div style={conatinerStyles}>
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
          return <ProductCart key={price.id} product={newProduct} />
        })}
      </div>
    )}
  />
)
