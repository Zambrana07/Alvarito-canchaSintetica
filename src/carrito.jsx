import { useState } from 'react'
import './styles/App.css'
import icon from './styles/Img/icon.jpg'
import carritoIcon from './styles/Img/carrito-icon.png'
import { isCartApiConfigured, syncCartWithPhp } from './services/cartApi'
import brownieImg from './styles/images/brownies.png'
import pastelImg from './styles/images/pastel-zanahoria.png'
import pieImg from './styles/images/pie-limon.png'
import desayunoImg from './styles/images/desayunos.png'
import bebidaImg from './styles/images/bebidas.jpg'

function Carrito() {
  const [cartItems, setCartItems] = useState([])
  const [syncMessage, setSyncMessage] = useState('')

  const productosDisponibles = [
    { id: 'brownie', name: 'Brownie', price: 1200, image: brownieImg },
    { id: 'pastel-zanahoria', name: 'Pastel de zanahoria', price: 1800, image: pastelImg },
    { id: 'pie-limon', name: 'Pie de limon', price: 1600, image: pieImg },
    { id: 'desayuno', name: 'Desayuno tipico', price: 2500, image: desayunoImg },
    { id: 'bebida', name: 'Bebida', price: 1000, image: bebidaImg }
  ]

  const addToCart = async (product) => {
    setCartItems((prev) => {
      const found = prev.find((item) => item.id === product.id)
      if (found) {
        return prev.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      }
      return [...prev, { ...product, quantity: 1 }]
    })

    try {
      await fetch("http://localhost:3001/carrito", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          nombre: product.name,   // ✅ corregido
          precio: product.price   // ✅ corregido
        })
      })
    } catch (error) {
      console.error("Error al guardar en la BD:", error)
    }
  }

  const updateQuantity = (productId, delta) => {
    setCartItems((prev) =>
      prev
        .map((item) =>
          item.id === productId
            ? { ...item, quantity: item.quantity + delta }
            : item
        )
        .filter((item) => item.quantity > 0)
    )
  }

  const removeFromCart = (productId) => {
    setCartItems((prev) => prev.filter((item) => item.id !== productId))
  }

  const subtotal = cartItems.reduce(
    (acc, item) => acc + (item.price * item.quantity), // ✅ corregido
    0
  )

  const cartComparison = [...cartItems].sort(
    (a, b) => a.price - b.price // ✅ corregido
  )

const handlePurchase = async () => {
  if (cartItems.length === 0) {
    setSyncMessage('Tu carrito está vacío.')
    return
  }

  try {
    if (isCartApiConfigured) {
      await syncCartWithPhp(cartItems)
    }

    setCartItems([]) // Vacía el carrito
    setSyncMessage('¡Compra realizada con éxito!')
  } catch {
    setSyncMessage('No se pudo completar la compra.')
  }
}

  return (
    <div className="pagina">
      <header className="header">
        <div className="header-left">
          <img src={icon} alt="" className="header-icon" />
          <h1 className="header-title">Soda armonia</h1>
        </div>
        <div className="cart-button">
          <img src={carritoIcon} alt="Carrito" />
          <span className="cart-count">
            {cartItems.reduce((acc, item) => acc + item.quantity, 0)}
          </span>
        </div>
      </header>

      <main className="body">
        <section className="cart-page">
          <a href="/" className="back-link">Volver a la pagina principal</a>

          <h1 className="section-title">Carrito de compras</h1>

          <div className="product-grid">
            {productosDisponibles.map((product) => (
              <article key={product.id} className="product-card">
                <div className="product-image-container">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="product-image"
                  />
                </div>

                <h3>{product.name}</h3>
                <p>Crc {product.price}</p>

                <button onClick={() => addToCart(product)}>
                  Agregar al carrito
                </button>
              </article>
            ))}
          </div>

          <section className="cart-page-panel">
            <h2>Tu carrito</h2>

            {cartItems.length === 0 && <p>Tu carrito esta vacio.</p>}

            {cartItems.map((item) => (
              <div key={item.id} className="cart-item">
                <div>
                  <p>{item.name}</p>
                  <p>Crc {item.price}</p>
                </div>

                <div className="cart-actions">
                  <button onClick={() => updateQuantity(item.id, -1)}>-</button>
                  <span>{item.quantity}</span>
                  <button onClick={() => updateQuantity(item.id, 1)}>+</button>
                  <button onClick={() => removeFromCart(item.id)}>Eliminar</button>
                </div>
              </div>
            ))}

            <p className="cart-total">Subtotal: Crc {subtotal}</p>

            <h3>Comparar</h3>
            {cartComparison.map((item) => (
              <p key={`${item.id}-compare`}>
                {item.name}: Crc {item.price}
              </p>
            ))}

            <button className="sync-button" onClick={handlePurchase}>
  Comprar
</button>

            {syncMessage && (
              <p className="sync-message">{syncMessage}</p>
            )}
          </section>
        </section>
      </main>
    </div>
  )
}

export default Carrito