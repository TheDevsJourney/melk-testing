import React, { useState } from "react"

import { useShoppingCart } from "use-shopping-cart"

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
  /* Gets the totalPrice and a method for redirecting to stripe */
  const {
    formattedTotalPrice,
    redirectToCheckout,
    cartCount,
    clearCart,
  } = useShoppingCart()

  const handleClick = async e => {
    e.preventDefault()
    try {
      const response = await fetch(
        "https://elated-lamarr-b45c38.netlify.app/.netlify/functions/getProducts",
        {
          method: "get",
          headers: {
            "Content-Type": "application/json",
          },
        }
      ).then(res => {
        return res.json()
      })
    } catch (error) {
      console.error(error)
    }
  }

  // let dataSkus
  /** Query live data from Stripe and update products */
  // const updateProducts = async () => {
  //   const { data, error } = await fetch("api/skuList")
  //     .then(response => response.json())
  //     .catch(error => console.error(error))

  //   if (error) {
  //     console.error(error)
  //     return
  //   }

  //   dataSkus = data
  // }

  return (
    <div>
      {/* This is where we'll render our cart */}
      <p>Number of Items: {cartCount}</p>
      <p>Total: {formattedTotalPrice}</p>

      <button onClick={handleClick}>Testing Stuff</button>

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
