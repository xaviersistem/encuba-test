require('dotenv').config();
const express = require('express');

const authRoutes = require('./routes/auth');
const productRoutes = require('./routes/products');

const app = express();
const PORT = process.env.PORT || 3000;

// Usa el middleware nativo de Express para parsear JSON.
app.use(express.json());

app.use('/api', authRoutes);
app.use('/api/products', productRoutes);

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});