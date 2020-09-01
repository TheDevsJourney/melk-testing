const stripe = require("stripe")(`${process.env.STRIPE_SECRET_KEY}`)

exports.handler = async event => {
  //   const product = await stripe.products.retrieve("prod_HrhMl8JQCWOdXp")
  //   return product
  console.log("hey")
}
