import React, { useEffect } from "react"

// Perhaps on this page we would updateProducts of the items in the cart after returning after a successful charge.
// Then remove all items from cart.

const success = () => {
  useEffect(() => {
    // make fetch to updateProduct here
    handleUpdate()
  }, [])
  const handleUpdate = async () => {
    const endpoint =
      "https://elated-lamarr-b45c38.netlify.app/.netlify/functions/updateProduct"
    const data = await fetch(endpoint)
    const res = await data.json()
  }
  return (
    <div>
      <h1>Success!</h1>
    </div>
  )
}

export default success
