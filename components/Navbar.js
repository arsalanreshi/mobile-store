import Link from "next/link";
import ThemeToggle from "./ThemeToggle";
import { useContext, useState } from "react";
import { CartContext } from "../pages/_app";
import Image from "next/image";

export default function Navbar() {
  const { cart, setIsCartOpen } = useContext(CartContext);

  // Calculate total items & total price
  const totalItems = cart.reduce((sum, i) => sum + i.qty, 0);
  const totalPrice = cart.reduce((sum, i) => sum + i.price * i.qty, 0);

  return (
    <header className="navbar">
      <div className="container navbar-container">
        <Link href="/" className="navbar-brand">
          <Image src="/ac.png" alt="logo" width={40} height={40} />
          Atim Communication
        </Link>

        <nav className="navbar-nav">
          <Link href="/">Home</Link>
          <Link href="/orders">Orders</Link>
          <Link href="/contact">Contact</Link>
          <Link href="/category/phones">Phones</Link>
          <Link href="/category/accessories">Accessories</Link>
          <Link href="/category/smartwatches">Smartwatches</Link>
        </nav>

        <div className="navbar-actions">
          <button
            className="cart-button"
            onClick={() => setIsCartOpen(true)}
          >
            🛒 Cart
            {totalItems > 0 && (
              <span className="cart-info">
                ({totalItems} | ₹ {totalPrice.toLocaleString("en-IN")})
              </span>
            )}
          </button>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
