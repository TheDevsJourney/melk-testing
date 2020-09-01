import React from "react"
import { useShoppingCart } from "use-shopping-cart"

const CartDisplay = () => {
  const {
    cartDetails,
    cartCount,
    formattedTotalPrice,
    redirectToCheckout,
    clearCart,
    setItemQuantity,
  } = useShoppingCart()

  const handleSubmit = async event => {
    event.preventDefault()

    const response = await fetch("api/createSession", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(cartDetails),
    })
      .then(res => {
        return res.json()
      })
      .catch(error => console.log(error))

    redirectToCheckout({ sessionId: response.sessionId })
  }

  if (Object.keys(cartDetails).length === 0) {
    return (
      <div style={{ textAlign: "center" }}>
        <h2>Shopping Cart Display Panel</h2>
        <h3>No items in cart</h3>
      </div>
    )
  } else {
    return (
      <div
        style={{
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <h2>Shopping Cart Display Panel</h2>
        {Object.keys(cartDetails).map(item => {
          const cartItem = cartDetails[item]
          const { name, sku, quantity } = cartItem
          return (
            <div
              key={cartItem.sku}
              style={{
                justifyContent: "space-around",
                alignItems: "center",
                width: "100%",
              }}
            >
              <div style={{ flexDirection: "column", alignItems: "center" }}>
                <img style={{ width: 100 }} src={cartItem.image} />
                <p>{name}</p>
              </div>
              {/* <Input
                type={"number"}
                max={99}
                style={{ width: 60 }}
                defaultValue={quantity}
                onChange={e => {
                  const { value } = e.target
                  setItemQuantity(sku, value)
                }}
              /> */}
            </div>
          )
        })}
        <h3>Total Items in Cart: {cartCount}</h3>
        <h3>Total Price: {formattedTotalPrice}</h3>
        <div as={"form"} action={"api/createSession"} method="POST">
          <button onClick={handleSubmit}>Checkout</button>
        </div>
        <button onClick={() => clearCart()}>Clear Cart Items</button>
      </div>
    )
  }
}

export default CartDisplay
