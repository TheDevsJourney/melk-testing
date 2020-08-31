import React from "react"
// import Layout from "../components/Layout"
import Products from "../components/Products/Products"

import Cart from "../components/Cart"

import { loadStripe } from "@stripe/stripe-js"
import { CartProvider } from "use-shopping-cart"

const stripePromise = loadStripe(`${process.env.STRIPE_PUBLISHABLE_KEY}`)

const Home = () => {
  return (
    // Mode was client-only testing checkout-session
    <CartProvider
      mode="client-only"
      stripe={stripePromise}
      successUrl="https://elated-lamarr-b45c38.netlify.app"
      cancelUrl="https://elated-lamarr-b45c38.netlify.app"
      currency="USD"
      allowedCountries={["US", "GB", "CA"]}
      billingAddressCollection={true}
    >
      <h1>Hey</h1>
      <p>yo</p>
      <Cart />
      <Products />
    </CartProvider>
  )
}

export default Home

// Todos
// Netlify Functions to remove stripe product after purchased
// Stripe webhook purchase completed
// Change active to false in stripe.
// https://stripe.com/docs/api/products/update?lang=node
// https://www.netlify.com/blog/2020/04/22/automate-order-fulfillment-w/stripe-webhooks-netlify-functions/
// https://www.netlify.com/blog/2020/04/13/learn-how-to-accept-money-on-jamstack-sites-in-38-minutes/
