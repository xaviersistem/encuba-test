const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/authMiddleware');
 
let products = [
  { id: 1, name: 'Laptop', description: 'Una laptop potente', price: 1200 },
  { id: 2, name: 'Teclado', description: 'Un teclado mecánico', price: 150 },
  { id: 3, name: 'Mouse', description: 'Un mouse ergonómico', price: 80 }
];
let nextId = 4;

// GET /api/products - Obtener todos los productos
router.get('/', (req, res) => {
  res.json(products);
});

// GET /api/products/:id - Obtener un producto por ID
router.get('/:id', (req, res) => {
  const product = products.find(p => p.id === parseInt(req.params.id));
  if (!product) {
    return res.status(404).json({ message: 'Producto no encontrado.' });
  }
  res.json(product);
});

// POST /api/products - Crear un nuevo producto
router.post('/', (req, res) => {
  const { name, description, price } = req.body;
  if (!name || !description || price === undefined) {
    return res.status(400).json({ message: 'Faltan los campos name, description o price.' });
  }

  const newProduct = {
    id: nextId++,
    name,
    description,
    price
  };
  products.push(newProduct);
  res.status(201).json(newProduct);
});

// PUT /api/products/:id - Actualizar un producto existente
router.put('/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const productIndex = products.findIndex(p => p.id === id);

  if (productIndex === -1) {
    return res.status(404).json({ message: 'Producto no encontrado.' });
  }

  const { name, description, price } = req.body;
  const updatedProduct = {
    id: id,
    name: name || products[productIndex].name,
    description: description || products[productIndex].description,
    price: price !== undefined ? price : products[productIndex].price
  };

  products[productIndex] = updatedProduct;
  res.json(updatedProduct);
});

// DELETE /api/products/:id - Eliminar un producto (Ruta protegida)
router.delete('/:id', verifyToken, (req, res) => {
  const id = parseInt(req.params.id);
  const initialLength = products.length;
  products = products.filter(p => p.id !== id);

  if (products.length === initialLength) {
    return res.status(404).json({ message: 'Producto no encontrado.' });
  }

  res.status(204).send(); // 204 No Content
});

module.exports = router;