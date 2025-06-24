const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router(); 

const user = {
  id: 1,
  username: 'admin',
  password: 'admin'
};

router.post('/login', (req, res) => {
  const { username, password } = req.body;
 
  if (username === user.username && password === user.password) {
        const payload = { user: { id: user.id, username: user.username } };
    
        const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.json({ token });
  } else {
    res.status(401).json({ message: 'Credenciales incorrectas.' });
  }
});

module.exports = router;