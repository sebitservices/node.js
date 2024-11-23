const mysql = require("mysql2");

// Configuración del pool de conexiones
const pool = mysql.createPool({
  host: "193.203.175.99",           // IP del servidor de Hostinger
  user: "u498125654_mi_usuario",    // Usuario de la base de datos
  password: "kaiser2121S",          // Contraseña de la base de datos
  database: "u498125654_mi_base_datos", // Nombre de la base de datos
  port: 3306,                       // Puerto MySQL
  waitForConnections: true,
  connectionLimit: 10,              // Máximo de conexiones simultáneas
  queueLimit: 0,                    // Sin límite para solicitudes en espera
});

// Exportamos el pool como una promesa
module.exports = pool.promise();
