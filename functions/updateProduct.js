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

  return stripe.products.update(`${sku.data.object.id}`, {
    metadata: { Quantity: 0 },
    active: "false",
  })

  //   try {
  //     const product = await stripe.products.update(`${sku.id}`, {
  //       metadata: { Quantity: 0 },
  //       active: "false",
  //     })
  //   }

  //   return {
  //     statusCode,
  //     headers,
  //     body: JSON.stringify({
  //       status: "worked",
  //       message: "Did it work?",
  //     }),
  //   }
}
