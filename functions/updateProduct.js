const stripe = require("stripe")(`${process.env.STRIPE_SECRET_KEY}`)

const statusCode = 200
const headers = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "Content-Type",
}

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
exports.handler = async event => {
  const { sku } = JSON.parse(event.body)

  let product
  try {
    product = await stripe.products.update(sku, {
      metadata: { Quantity: "0" },
      active: "false",
    })
  } catch (e) {
    console.error(e.message)
  }

  return {
    statusCode,
    headers,
    body: JSON.stringify({
      status: "worked",
      message: "Did it work?",
    }),
  }
}
