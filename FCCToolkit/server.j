const express = require('express');
const path = require('path');

const app = express();
const port = process.env.PORT || 80;

// Servir archivos estáticos desde la carpeta 'dist'
app.use(express.static(path.join(__dirname, 'dist')));

// Ruta para manejar todas las solicitudes y enviar el archivo HTML principal
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

// Iniciar el servidor
app.listen(port, '0.0.0.0', () => {
  console.log(`Servidor Express escuchando en el puerto ${port}`);
});
