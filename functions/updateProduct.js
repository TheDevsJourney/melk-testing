const stripe = require("stripe")(`${process.env.STRIPE_SECRET_KEY}`)

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
