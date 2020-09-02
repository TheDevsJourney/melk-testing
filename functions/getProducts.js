const stripe = require("stripe")(`${process.env.STRIPE_SECRET_KEY}`)

exports.handler = async (event, context, callback) => {
  const products = await stripe.products.list()

  const response = {
    statusCode: 200,
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
    body: JSON.stringify(products),
  }
  callback(null, response)
}
