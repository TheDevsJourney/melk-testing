import React from "react"
// import Products from "../components/Products/Products"
// import Cart from "../components/Cart"
import Layout from "../components/Layout"
// import { CartProvider } from "use-shopping-cart"
// import { loadStripe } from "@stripe/stripe-js"

// const stripePromise = loadStripe(`${process.env.GATSBY_STRIPE_PUBLISHABLE_KEY}`)

const Home = () => {
  return (
    <Layout>
      {/* <CartProvider
        mode="client-only"
        stripe={stripePromise}
        currency="USD"
        successUrl="https://elated-lamarr-b45c38.netlify.app/"
        cancelUrl="https://elated-lamarr-b45c38.netlify.app/"
        allowedCountries={["US"]}
        billingAddressCollection={true}
      >
        <Cart />
        <Products />
      </CartProvider> */}
      <h1>Home</h1>
    </Layout>
  )
}

export default Home
