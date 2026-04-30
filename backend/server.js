const express = require("express")
const cors = require("cors")
const { Pool } = require("pg")

const app = express()

app.use(cors())
app.use(express.json())

/* Conexión a PostgreSQL */
const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "dbarmonia",
  password: "123456",
  port: 5432
})

/* Verificar conexión */
pool.connect()
  .then(() => console.log("Conectado a PostgreSQL"))
  .catch(err => console.error("Error de conexión:", err.message))

/* Levantar servidor */
app.listen(3001, () => {
  console.log("Servidor backend funcionando en puerto 3001")
})

/* API para agregar producto al carrito */
app.post("/carrito", async (req, res) => {
  const { nombre, precio } = req.body

  try {
    // ✅ Validación mejorada
    if (!nombre || precio === undefined) {
      return res.status(400).json({ error: "Faltan datos obligatorios" })
    }

    const result = await pool.query(
      "INSERT INTO carrito(nombre, precio, cantidad) VALUES($1,$2,$3) RETURNING *",
      [nombre, precio, 1]
    )

    res.json({
      mensaje: "Producto agregado al carrito",
      producto: result.rows[0]
    })

  } catch (error) {
    console.error("ERROR DETALLADO:", error.message)

    res.status(500).json({
      error: "Error al agregar producto",
      detalle: error.message
    })
  }
})

/* API para ver el carrito */
app.get("/carrito", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM carrito ORDER BY id DESC")
    res.json(result.rows)
  } catch (error) {
    console.error("ERROR DETALLADO:", error.message)
    res.status(500).json({ error: "Error al obtener carrito" })
  }
})