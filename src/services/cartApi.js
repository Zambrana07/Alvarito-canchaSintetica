const API_BASE = import.meta.env.VITE_PHP_API_BASE || ''
const CART_ENDPOINT = `${API_BASE}/cart.php`

export const isCartApiConfigured = Boolean(API_BASE)

export function buildCartPayload(items) {
  return {
    items: items.map((item) => ({
      id: item.id,
      name: item.name,
      price: item.price,
      quantity: item.quantity
    }))
  }
}

export async function syncCartWithPhp(items) {
  if (!isCartApiConfigured) {
    return { ok: false, message: 'API_BASE_NOT_CONFIGURED' }
  }

  const response = await fetch(CART_ENDPOINT, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(buildCartPayload(items))
  })

  if (!response.ok) {
    throw new Error(`SYNC_FAILED_${response.status}`)
  }

  return response.json()
}
