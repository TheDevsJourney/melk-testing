const stripe = require("stripe")(`${process.env.STRIPE_SECRET_KEY}`)

exports.handler = async () => {
  return stripe.products.retrieve("prod_HrhMl8JQCWOdXp")
}
