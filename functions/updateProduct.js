const stripe = require("stripe")(`${process.env.STRIPE_SECRET_KEY}`)

// const statusCode = 200
// const headers = {
//   "Access-Control-Allow-Origin": "*",
//   "Access-Control-Allow-Headers": "Content-Type",
// }

// exports.handler = async event => {
//   const { sku } = JSON.parse(event.body)

//   let product

//   try {
//     product = await stripe.products.update(sku, {
//       metadata: { quantity: "0" },
//       active: "false",
//     })
//   } catch (e) {
//     console.error(e.message)
//   }

//   return {
//     statusCode,
//     headers,
//     body: JSON.stringify({
//       status: "worked",
//       message: "Did it work?",
//     }),
//   }
// }

// Testing
exports.handler = async ({ body, headers, event }) => {
  const { sku } = JSON.parse(event.body)
  try {
    // check the webhook to make sure it’s valid
    const stripeEvent = stripe.webhooks.constructEvent(
      body,
      headers["stripe-signature"],
      process.env.STRIPE_WEBHOOK_SECRET
    )

    // only do stuff if this is a successful Stripe Checkout purchase
    if (stripeEvent.type === "charge.succeeded") {
      let product

      try {
        product = await stripe.products.update(sku, {
          metadata: { quantity: "0" },
          active: "false",
        })
      } catch (e) {
        console.error(e.message)
      }
    }

    return {
      statusCode: 200,
      body: JSON.stringify({ received: true }),
    }
  } catch (err) {
    console.log(`Stripe webhook failed with ${err}`)

    return {
      statusCode: 400,
      body: `Webhook Error: ${err.message}`,
    }
  }
}
