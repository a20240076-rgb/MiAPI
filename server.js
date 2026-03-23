const express = require("express");
const app = express();

app.use(express.json());

let datos = [
  { id: 1, nombre: "Taco", precio: 20 },
  { id: 2, nombre: "Quesadilla", precio: 25 }
];


// Obtener todos
app.get("/productos", (req, res) => {
  res.json(datos);
});


// Obtener uno
app.get("/productos/:id", (req, res) => {
  const producto = datos.find(p => p.id == req.params.id);
  res.json(producto);
});


// Agregar
app.post("/productos", (req, res) => {
  const nuevo = {
    id: datos.length + 1,
    nombre: req.body.nombre,
    precio: req.body.precio
  };

  datos.push(nuevo);
  res.json(nuevo);
});


// Editar
app.put("/productos/:id", (req, res) => {
  const producto = datos.find(p => p.id == req.params.id);

  producto.nombre = req.body.nombre;
  producto.precio = req.body.precio;

  res.json(producto);
});


// Eliminar
app.delete("/productos/:id", (req, res) => {
  datos = datos.filter(p => p.id != req.params.id);
  res.json({ mensaje: "Producto eliminado" });
});


app.listen(3000, () => {
  console.log("API corriendo en puerto 3000");
});