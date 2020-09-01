import React from "react"

import { useShoppingCart, formatCurrencyString } from "use-shopping-cart"

// Need to figure out how to check cart details to see if sku of item trying to be added has already been added.
// Should only be able to add one of any given item to the cart at a time

const cardStyles = {
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-around",
  alignItems: "flex-start",
  padding: "1rem",
  marginBottom: "1rem",
  boxShadow: "5px 5px 25px 0 rgba(46,61,73,.2)",
  backgroundColor: "#fff",
  borderRadius: "6px",
  maxWidth: "300px",
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

// const buttonHide = {
//   display: "none",
// }

const ProductCard = ({ product }) => {
  const { addItem, removeItem, cartDetails } = useShoppingCart()

  return (
    <div style={cardStyles}>
      <h4>{product.name}</h4>
      <p>{product.quantity}</p>
      <p>
        Price:{" "}
        {formatCurrencyString({
          value: parseInt(product.price),
          currency: product.currency,
        })}
      </p>
      {product.quantity < 1 ? (
        <button>Out Of Stock</button>
      ) : (
        <button
          id={`checkout-button-${product.sku}`}
          role="link"
          style={buttonStyles}
          onClick={() => {
            // Check to see if object.keys(cartDetails) has a match
            if (Object.keys(cartDetails).includes(product.sku)) {
              return
            }
            // For Testing Purposes
            // if (product.quantity < 1) {
            //   return
            // }
            addItem(product)
          }}
        >
          {Object.keys(cartDetails).includes(product.sku)
            ? "ADDED"
            : "ADD TO CART"}
        </button>
      )}

      {product.quantity > 0 && (
        <button style={buttonStyles} onClick={() => removeItem(product.sku)}>
          Remove Item
        </button>
      )}
    </div>
  )
}

export default ProductCard
