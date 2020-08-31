import React from "react"
import { CartProvider } from "use-shopping-cart"
import { loadStripe } from "@stripe/stripe-js"

const stripePromise = loadStripe(`${process.env.STRIPE_PUBLISHABLE_KEY}`)

const wrapRootElement = ({ element }) => {
  return (
    <CartProvider
      mode="client-only"
      stripe={stripePromise}
      currency="USD"
      successUrl="http://localhost:3000/success"
      cancelUrl="http://localhost:3000"
      allowedCountries={["US"]}
      billingAddressCollection={true}
    >
      {element}
    </CartProvider>
  )
}

export default wrapRootElement
