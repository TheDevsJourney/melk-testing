const stripe = require("stripe")(`${process.env.STRIPE_SECRET_KEY}`)

// Testing
exports.handler = async (event, context, callback) => {
  // const sku = JSON.parse(event.body)
  // console.log(sku)

  // stripe.products.update(product, {
  //   metadata: { Quantity: 0 },
  //   active: "false",
  // })

  const requestBody = JSON.parse(event.body)
  const productId = requestBody.productId

  await stripe.products.update(`${productId}`, {
    metadata: { Quantity: 0 },
    active: "false",
  })

  // const response = {
  //   statusCode: 200,
  //   headers: {
  //     "Access-Control-Allow-Origin": "*",
  //   },
  //   body: JSON.stringify({
  //     product,
  //   }),
  // }
  // callback(null, response)
}
