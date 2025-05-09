// config/database.js
const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres',       
  host: 'localhost',       
  database: 'restaurant_db', 
  password: '',   // Reemplazar con una contraseña, para ahorrar tiempo utilicé trust como método de autenticación
  port: 5432,              
});

module.exports = pool;