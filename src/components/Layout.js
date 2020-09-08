import React, { useState, useEffect } from "react"
import "../../src/style.css"
// const [products, setProducts] = useState()

import { loadStripe } from "@stripe/stripe-js"
import Products from "../components/Products/Products"
import Cart from "../components/Cart"
import { CartProvider } from "use-shopping-cart"
import Nav from "../components/Nav"

const stripePromise = loadStripe(`${process.env.GATSBY_STRIPE_PUBLISHABLE_KEY}`)

export default function Layout({ children }) {
  // useEffect(() => {
  //   handleSubmit()
  // }, [])

  // const handleSubmit = async () => {
  //   const endpoint =
  //     "https://elated-lamarr-b45c38.netlify.app/.netlify/functions/getProducts"
  //   const data = await fetch(endpoint)
  //   const res = await data.json()
  //   setProducts(res)
  //   // console.log(res)
  // }

  return (
    <CartProvider
      mode="client-only"
      stripe={stripePromise}
      currency="USD"
      successUrl="https://elated-lamarr-b45c38.netlify.app/"
      cancelUrl="https://elated-lamarr-b45c38.netlify.app/"
      allowedCountries={["US"]}
      billingAddressCollection={true}
    >
      <div className="container">
        <Nav />
        {children}
      </div>
      {/* <Cart /> */}
      {/* <Products /> */}
    </CartProvider>
  )
}
