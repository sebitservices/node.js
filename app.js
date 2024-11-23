const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const pool = require("./db"); // Importamos el pool de conexiones

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Ruta de prueba para verificar conexión a la base de datos
app.get("/", async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT 1 + 1 AS resultado");
    res.send(`Conexión exitosa. Resultado: ${rows[0].resultado}`);
  } catch (err) {
    console.error("Error en la conexión:", err);
    res.status(500).send("Error al conectar con la base de datos.");
  }
});

// Ruta para registrar un usuario
app.post("/register", async (req, res) => {
  const { nombre, email, password } = req.body;

  if (!nombre || !email || !password) {
    return res.status(400).send("Todos los campos son obligatorios.");
  }

  try {
    const query = "INSERT INTO usuarios (nombre, email, password) VALUES (?, ?, ?)";
    const [result] = await pool.query(query, [nombre, email, password]);
    res.status(200).send("Usuario registrado exitosamente.");
  } catch (err) {
    console.error("Error al registrar usuario:", err);
    res.status(500).send("Error al registrar el usuario.");
  }
});

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
