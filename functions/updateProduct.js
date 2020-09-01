const stripe = require("stripe")(`${process.env.STRIPE_SECRET_KEY}`)

const statusCode = 200
const headers = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "Content-Type",
}

// Testing
exports.handler = async event => {
  const sku = JSON.parse(event.body)
  console.log(sku)

  return stripe.products.update("prod_HrhMl8JQCWOdXp", {
    metadata: { Quantity: 0 },
    active: "false",
  })
}
// `${sku.data.object.id}`
// Need to find a way to run the webhook from the code, and the serverless function from the code so I can pass in the product ID
