import React, { useEffect } from "react"
import { useShoppingCart } from "use-shopping-cart"

const Success = () => {
  const { cartDetails, removeItem } = useShoppingCart()

  useEffect(() => {
    // make fetch to updateProduct here
    Object.entries(cartDetails).map(entry => {
      handleUpdate(entry[1].sku)
      // removeItem(entry[1].sku)
    })
  }, [])

  const handleUpdate = async price => {
    // await fetch("https://elated-lamarr-b45c38.netlify.app/.netlify/functions/updateProduct")
    // const data = await fetch(endpoint)
    // const res = await data.json()

    await fetch(
      "https://elated-lamarr-b45c38.netlify.app/.netlify/functions/updateProduct",
      {
        // method: "POST",
        body: {
          priceID: price,
        },
      }
    )

    removeItem(price)
  }

  return <div></div>
}

export default Success
