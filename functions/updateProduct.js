const stripe = require("stripe")(`${process.env.STRIPE_SECRET_KEY}`)

// Testing
exports.handler = async (event, callback) => {
  // const sku = JSON.parse(event.body)
  // console.log(sku)

  const sku = await stripe.products.update("prod_HrhMl8JQCWOdXp", {
    metadata: { Quantity: 0 },
    active: "false",
  })

  const response = {
    statusCode: 200,
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
    body: JSON.stringify(sku),
  }
  callback(null, response)
}
// `${sku.data.object.id}`
// Need to find a way to run the webhook from the code, and the serverless function from the code so I can pass in the product ID
