/*Crear el servidor*/

const express = require("express")

const cors = require("cors")

const { Pool } = require("pg")


const app = express()


app.use(cors())

app.use(express.json())

/*Conexión a PostgreSQL*/

const pool = new Pool({

  user: "postgres",

  host: "localhost",

  database: "dbArmonia",

  password: "123456",

  port: 5432

})

/*Levantar servidor*/

app.listen(3001, () => {

  console.log("Servidor backend funcionando en puerto 3001")

})

/*API para agregar producto al carrito*/

app.post("/carrito", async (req, res) => {


  const { nombre, precio, imagen } = req.body


  try {


    await pool.query(

      "INSERT INTO carrito(nombre,precio,imagen,cantidad) VALUES($1,$2,$3,$4)",

      [nombre, precio, imagen, 1]

    )


    res.json({ mensaje: "Producto agregado al carrito" })


  } catch (error) {

    console.log(error)

    res.status(500).json({ error: "Error al agregar producto" })

  }


})

/* API para actualizar cantidad */
app.put("/carrito/:id", async (req, res) => {
  const { id } = req.params
  const { delta } = req.body

  try {
    await pool.query(
      "UPDATE carrito SET cantidad = cantidad + $1 WHERE id = $2",
      [delta, id]
    )

    await pool.query("DELETE FROM carrito WHERE cantidad <= 0")

    res.json({ mensaje: "Cantidad actualizada" })
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: "Error al actualizar cantidad" })
  }
})

/*API para ver el carrito*/

app.get("/carrito", async (req, res) => {


  try {


    const result = await pool.query("SELECT * FROM carrito")


    res.json(result.rows)


  } catch (error) {

    console.log(error)

    res.status(500).json({ error: "Error al obtener carrito" })

  }


})

/*API para eliminar un producto del carrito*/

app.delete("/carrito/:id", async (req, res) => {


  const id = req.params.id


  try {


    await pool.query(

      "DELETE FROM carrito WHERE id=$1",

      [id]

    )


    res.json({ mensaje: "Producto eliminado del carrito" })


  } catch (error) {

    console.log(error)

    res.status(500).json({ error: "Error al eliminar producto" })

  }

})

app.delete("/carrito", async (req, res) => {


  try {


    await pool.query("DELETE FROM carrito")


    res.json({ mensaje: "Carrito vaciado" })


  } catch (error) {

    console.log(error)

    res.status(500).json({ error: "Error al vaciar carrito" })

  }


})