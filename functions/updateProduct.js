const stripe = require("stripe")(`${process.env.STRIPE_SECRET_KEY}`)

// Testing
exports.handler = async ({ body, headers }) => {
  // const sku = JSON.parse(event.body)
  // console.log(sku)

  // stripe.products.update(product, {
  //   metadata: { Quantity: 0 },
  //   active: "false",
  // })

  try {
    // check the webhook to make sure it’s valid
    const stripeEvent = stripe.webhooks.constructEvent(
      body,
      headers["stripe-signature"],
      process.env.STRIPE_WEBHOOK_SECRET
    )

    // only do stuff if this is a successful Stripe Checkout purchase
    if (stripeEvent.type === "checkout.session.completed") {
      const eventObject = stripeEvent.data.object
      return eventObject
    }
  } catch (err) {
    console.log(`Stripe webhook failed with ${err}`)
  }
}
