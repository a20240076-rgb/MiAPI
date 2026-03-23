const express = require("express");
const cors = require("cors");
const { Pool } = require("pg");

const app = express();

app.use(cors());
app.use(express.json());

// conexión a PostgreSQL (Railway)
const pool = new Pool({
  connectionString: "postgresql://postgres:HTIIdfzPdZEMKEZulcOqoKHrlAidJstw@caboose.proxy.rlwy.net:18595/railway",
  ssl: {
    rejectUnauthorized: false
  }
});


// ================= OBTENER TODOS =================

app.get("/productos", async (req, res) => {

  const resultado = await pool.query("SELECT * FROM productos");

  res.json(resultado.rows);

});


// ================= OBTENER UNO =================

app.get("/productos/:id", async (req, res) => {

  const id = req.params.id;

  const resultado = await pool.query(
    "SELECT * FROM productos WHERE id=$1",
    [id]
  );

  res.json(resultado.rows[0]);

});


// ================= AGREGAR =================

app.post("/productos", async (req, res) => {

  const { nombre, precio } = req.body;

  const resultado = await pool.query(
    "INSERT INTO productos(nombre,precio) VALUES($1,$2) RETURNING *",
    [nombre, precio]
  );

  res.json(resultado.rows[0]);

});


// ================= EDITAR =================

app.put("/productos/:id", async (req, res) => {

  const id = req.params.id;
  const { nombre, precio } = req.body;

  const resultado = await pool.query(
    "UPDATE productos SET nombre=$1, precio=$2 WHERE id=$3 RETURNING *",
    [nombre, precio, id]
  );

  res.json(resultado.rows[0]);

});


// ================= ELIMINAR =================

app.delete("/productos/:id", async (req, res) => {

  const id = req.params.id;

  await pool.query(
    "DELETE FROM productos WHERE id=$1",
    [id]
  );

  res.json({ mensaje: "Producto eliminado" });

});


app.listen(3000, () => {
  console.log("API corriendo en puerto 3000");
});