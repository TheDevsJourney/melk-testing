import React, { useState } from "react"
import { Link } from "gatsby"
import Cart from "../components/Cart"
import { useShoppingCart } from "use-shopping-cart"

const Nav = () => {
  const [toggle, setToggle] = useState(false)

  const { formattedTotalPrice, cartCount } = useShoppingCart()

  return (
    <>
      <nav
        style={{
          display: "flex",
          justifyContent: "space-between",
          padding: "25px 0",
        }}
      >
        This is the header
        <ul>
          <li>
            <Link to={`/`}>Home</Link>
          </li>
          <li>
            <Link to={`/products`}>Products</Link>
          </li>
          <li>
            <a href="#" onClick={() => setToggle(!toggle)}>
              Cart{" "}
              <span className={cartCount > 0 && "cartCount"}>
                {cartCount > 0 && cartCount}
              </span>
            </a>
          </li>
        </ul>
      </nav>
      {/* if toggle - show cart */}
      {/* Maybe instead of change if the cart is showing or not, add a class to cart so an animation can occur */}
      {toggle && <Cart toggle={toggle} setToggle={setToggle} />}
    </>
  )
}

export default Nav
