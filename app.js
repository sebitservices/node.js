const express = require("express");
const bodyParser = require("body-parser");
const mysql = require("mysql2");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Configuración de la base de datos
const db = mysql.createConnection({
  host: "193.203.175.99",        // IP de tu servidor MySQL
  user: "u498125654_mi_usuario", // Usuario de la base de datos
  password: "kaiser2121S",       // Contraseña de la base de datos
  database: "u498125654_mi_base_datos", // Nombre de la base de datos
  port: 3306                     // Puerto MySQL
});

// Verificar conexión a la base de datos
db.connect((err) => {
  if (err) {
    console.error("Error al conectar con la base de datos:", err);
  } else {
    console.log("Conexión exitosa a la base de datos.");
  }
});

// Ruta para registrar un usuario
app.post("/register", (req, res) => {
  const { nombre, email, password } = req.body;

  if (!nombre || !email || !password) {
    return res.status(400).send("Todos los campos son obligatorios.");
  }

  const query = "INSERT INTO usuarios (nombre, email, password) VALUES (?, ?, ?)";
  db.query(query, [nombre, email, password], (err, result) => {
    if (err) {
      console.error("Error al registrar usuario:", err);
      return res.status(500).send("Error al registrar el usuario.");
    }
    res.status(200).send("Usuario registrado exitosamente.");
  });
});

// Servidor escuchando
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
