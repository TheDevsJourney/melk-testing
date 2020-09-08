const path = require("path")
exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions

  const productTemplate = path.resolve(`src/templates/product.js`)

  const result = await graphql(`
    query ProductPrices {
      allStripePrice {
        edges {
          node {
            id
            currency
            unit_amount
            product {
              id
              name
              metadata {
                Quantity
              }
              images
              active
            }
          }
        }
      }
    }
  `)

  const products = result.data.allStripePrice.edges

  products.forEach(product => {
    let productName = `${product.node.product.name}`

    createPage({
      path: `/products/${productName.toLowerCase()}`,
      component: path.resolve(`src/templates/product.js`),
      context: { id: product.node.id },
    })
  })
}
