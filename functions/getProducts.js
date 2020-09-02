const stripe = require("stripe")(`${process.env.STRIPE_SECRET_KEY}`)

exports.handler = async () => {
  const products = await stripe.products.list()
  return products
}
