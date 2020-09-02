import React, { useState, useEffect } from "react"

import { useShoppingCart } from "use-shopping-cart"

// useEffect(() => {
//   console.log("loaded...")
//   handleSubmit()
// })

const [products, setProducts] = useState()

const handleSubmit = async () => {
  try {
    await fetch(
      "https://elated-lamarr-b45c38.netlify.app/.netlify/functions/getProducts"
    )
      .then(response => response.json())
      .then(res => setProducts(res.data))
  } catch (error) {
    console.error(error)
  }
  console.log(products)
}

const buttonStyles = {
  fontSize: "13px",
  textAlign: "center",
  color: "#fff",
  outline: "none",
  padding: "12px",
  boxShadow: "2px 5px 10px rgba(0,0,0,.1)",
  backgroundColor: "rgb(255, 178, 56)",
  borderRadius: "6px",
  letterSpacing: "1.5px",
}

const Cart = () => {
  const [loading, setLoading] = useState(false)
  // const [products, setProducts] = useState()

  /* Gets the totalPrice and a method for redirecting to stripe */
  const {
    formattedTotalPrice,
    redirectToCheckout,
    cartCount,
    clearCart,
  } = useShoppingCart()

  //  Use this before adding items to the cart and checking out to see if any items are Active = false
  // const handleSubmit = async () => {
  //   try {
  //     await fetch(
  //       "https://elated-lamarr-b45c38.netlify.app/.netlify/functions/getProducts"
  //     )
  //       .then(response => response.json())
  //       .then(res => setProducts(res.data))
  //   } catch (error) {
  //     console.error(error)
  //   }
  //   console.log(products)
  // }

  return (
    <div>
      {/* This is where we'll render our cart */}
      <p>Number of Items: {cartCount}</p>
      <p>Total: {formattedTotalPrice}</p>

      <button onClick={handleSubmit}>Testing Stuff</button>

      {/* Redirects the user to Stripe */}
      {cartCount !== 0 && (
        <button
          role="link"
          style={buttonStyles}
          disabled={loading}
          onClick={() => {
            setLoading(true)
            redirectToCheckout()
          }}
        >
          {loading ? "Loading..." : "Checkout"}
        </button>
      )}
      <button style={buttonStyles} onClick={clearCart}>
        Clear cart
      </button>
    </div>
  )
}

export default Cart
