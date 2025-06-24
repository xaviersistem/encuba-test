const jwt = require('jsonwebtoken');

function verifyToken(req, res, next) {
  const bearerH = req.headers['authorization'];

  if (typeof bearerH !== 'undefined') {
    const bearerToken = bearerH.split(' ')[1];
    
    jwt.verify(bearerToken, process.env.JWT_SECRET, (err, authData) => {
      if (err) {
        return res.status(403).json({ message: 'Token inválido o expirado.' });
      }
      // Opcional: puedes adjuntar los datos del usuario al request
      req.authData = authData;
      next();
    });
  } else {
    res.status(401).json({ message: 'Acceso no autorizado. Token vacio.' });
  }
}

module.exports = verifyToken;