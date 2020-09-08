import React, { useState, useEffect } from "react"
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

const Cart = ({ toggle, setToggle }) => {
  const [loading, setLoading] = useState(false)
  const [products, setProducts] = useState()

  useEffect(() => {
    handleSubmit()
  }, [])

  /* Gets the totalPrice and a method for redirecting to stripe */
  const {
    formattedTotalPrice,
    redirectToCheckout,
    cartCount,
    clearCart,
    cartDetails,
    removeItem,
  } = useShoppingCart()

  //  Use this before adding items to the cart and checking out to see if any items are Active = false
  //  Rename to something more appropriate for what it will actually do
  const handleSubmit = async () => {
    const endpoint =
      "https://elated-lamarr-b45c38.netlify.app/.netlify/functions/getProducts"
    const data = await fetch(endpoint)
    const res = await data.json()
    setProducts(res)
    // console.log(res)
  }

  // Will run a serverless function to retreive products to update state before a purchase
  // Then run these functions as a safeguard to ensure the user does not have a product in their cart that is not available
  let checkCartEntries = []
  let cartNameSku = []
  const checkCart = () => {
    if (Object.keys(cartDetails).length < 1) {
      return
    }
    // Grabs the Product name of items in the cart
    Object.entries(cartDetails).map(entry => {
      if (!checkCartEntries.includes(entry[1].name)) {
        checkCartEntries.push(entry[1].name)
        cartNameSku.push({ name: entry[1].name, sku: entry[1].sku })
      }
    })
    console.log(checkCartEntries)
    console.log(cartNameSku)
    // Check to see if these items are available in the products state
  }

  // Check Product State
  let checkProductEntries = []
  const checkProducts = () => {
    if (products === undefined || products.data.length < 1) {
      return
    }
    products.data.map(product => {
      if (
        product.metadata.Quantity > 0 &&
        !checkProductEntries.includes(product.name)
      ) {
        checkProductEntries.push(product.name)
      }
    })
    console.log(checkProductEntries)
  }

  // Checks to see if any of the cart entries are not included in the product state
  let outOfStockProducts = []
  const checkCartAgainstProducts = () => {
    // Run getProducts serverless function again
    handleSubmit()
    // Check cart
    checkCart()
    // check product
    checkProducts()

    // Check to see if the cart entries match what is available in product state, if not, push it to outofstock array.
    checkCartEntries.map(cartEntry => {
      if (!checkProductEntries.includes(cartEntry)) {
        outOfStockProducts.push(cartEntry)
      }
    })

    // If no out of stock products, can return out of this function. Otherwise, remove outofstock entries from the cart.
    if (outOfStockProducts.length < 1) {
      return
    }
    // Remove item from cart
    outOfStockProducts.map(product => {
      cartNameSku.map(nameSku => {
        if (product === nameSku.name) {
          removeItem(nameSku.sku)
        }
      })
    })
    console.log(outOfStockProducts)
  }

  return (
    <div className="cart">
      {/* This is where we'll render our cart */}
      <h4
        onClick={() => {
          setToggle(false)
        }}
      >
        X
      </h4>
      <p>Number of Items: {cartCount}</p>
      <p>Total: {formattedTotalPrice}</p>
      {/* Loop through each cartDetails item and display cart entries */}
      {Object.entries(cartDetails).map(entry => (
        <div className="cartItems">
          <div className="cartItems-left">
            <img src={entry[1].image[0]} height="55px" alt="" />
            <div className="cartItems-details">
              <h3 key={entry[1].sku}>{entry[1].name}</h3>
              <p>{entry[1].price / 100}</p>
            </div>
          </div>
          <p
            style={{ color: "white", fontSize: "2.3rem", cursor: "pointer" }}
            onClick={() => {
              removeItem(entry[1].sku)
            }}
          >
            X
          </p>
        </div>
      ))}

      {/* <button onClick={handleSubmit}>Testing Stuff</button>
      <button onClick={checkCart}>Check Cart</button>
      <button onClick={checkProducts}>Check State</button> */}
      <button onClick={checkCartAgainstProducts}>Check Out Of Stock</button>

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

// try {
//   await fetch(
//     "https://elated-lamarr-b45c38.netlify.app/.netlify/functions/getProducts"
//   )
//     .then(response => response.json())
//     .then(res => setProducts(res.data))
//     .then(console.log(products))
// } catch (error) {
//   console.error(error)
// }

// try {
//   let data = await (
//     await fetch(
//       "https://elated-lamarr-b45c38.netlify.app/.netlify/functions/getProducts"
//     ).catch(handleError)
//   ).json()

//   setProducts(data.data)
//   console.log(products)
// } catch (error) {
//   console.log(error)
// }

// if (data.code && data.code === 400) {
//   return
// }

// const handleError = err => {
//   console.error(err)
//   let resp = new Response(
//     JSON.stringify({
//       code: 400,
//       message: "Something went wrong.",
//     })
//   )
//   return resp
// }
