import { useState } from 'react'
import './styles/App.css'
import icon from './styles/Img/icon.jpg'
import carritoIcon from './styles/Img/carrito-icon.png'
import img5 from './styles/images/brownies.png'
import img6 from './styles/images/pastel-zanahoria.png'
import img7 from './styles/images/pie-limon.png'
import img8 from './styles/images/desayunos.png'
import img9 from './styles/images/bebidas.jpg'
import { isCartApiConfigured, syncCartWithPhp } from './services/cartApi'

function Carrito() {
  const [cartItems, setCartItems] = useState([])
  const [syncMessage, setSyncMessage] = useState('')

  const productosDisponibles = [
    { id: 'brownie', name: 'Brownie', price: 1200, img: img5 },
    { id: 'pastel-zanahoria', name: 'Pastel de zanahoria', price: 1800, img: img6 },
    { id: 'pie-limon', name: 'Pie de limon', price: 1600, img: img7 },
    { id: 'desayuno', name: 'Desayuno tipico', price: 2500, img: img8 },
    { id: 'bebida', name: 'Bebida', price: 1000, img: img9 }
  ]

  const addToCart = (product) => {
    setCartItems((prev) => {
      const found = prev.find((item) => item.id === product.id)
      if (found) {
        return prev.map((item) => (
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        ))
      }
      return [...prev, { ...product, quantity: 1 }]
    })
  }

  const updateQuantity = (productId, delta) => {
    setCartItems((prev) => (
      prev
        .map((item) => (
          item.id === productId ? { ...item, quantity: item.quantity + delta } : item
        ))
        .filter((item) => item.quantity > 0)
    ))
  }

  const removeFromCart = (productId) => {
    setCartItems((prev) => prev.filter((item) => item.id !== productId))
  }

  const subtotal = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0)
  const cartComparison = [...cartItems].sort((a, b) => a.price - b.price)

  const syncCart = async () => {
    if (!isCartApiConfigured) {
      setSyncMessage('Configura VITE_PHP_API_BASE para conectar con PHP.')
      return
    }
    try {
      const result = await syncCartWithPhp(cartItems)
      setSyncMessage(result.ok === false ? 'No se pudo sincronizar.' : 'Carrito sincronizado con PHP.')
    } catch {
      setSyncMessage('No se pudo sincronizar.')
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
          <span className="cart-count">{cartItems.reduce((acc, item) => acc + item.quantity, 0)}</span>
        </div>
      </header>

      <main className="body">
        <section className="cart-page">
          <a href="/" className="back-link">Volver a la pagina principal</a>
          <h1 className="section-title">Carrito de compras</h1>
          <p className="body-intro text-below-carrusel">Selecciona productos, compara precios y sincroniza cuando conecten el backend en PHP.</p>

          <div className="product-grid">
            {productosDisponibles.map((product) => (
              <article key={product.id} className="product-card">
                <img src={product.img} alt={product.name} />
                <h3>{product.name}</h3>
                <p>Crc {product.price}</p>
                <button onClick={() => addToCart(product)}>Agregar al carrito</button>
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
              <p key={`${item.id}-compare`}>{item.name}: Crc {item.price}</p>
            ))}
            <button className="sync-button" onClick={syncCart}>Sincronizar con PHP</button>
            {syncMessage && <p className="sync-message">{syncMessage}</p>}
          </section>
        </section>
      </main>
    </div>
  )
}

export default Carrito
