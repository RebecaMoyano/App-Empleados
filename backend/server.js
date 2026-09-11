const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = 3000;

// Middleware para permitir comunicación entre frontend y backend y leer JSON
app.use(cors());
app.use(express.json());

// Servir los archivos estáticos de la carpeta frontend (HTML, CSS, JS)
app.use(express.static(path.join(__dirname, '../frontend')));

app.use(express.static('public'));

// Ruta de prueba para comprobar que la API responde
app.get('/api/status', (req, res) => {
    res.json({ mensaje: 'El servidor de la app corporativa está activo' });
});

app.listen(PORT, () => { //si todo salió bien 
    console.log(`Servidor corporativo corriendo en http://localhost:${PORT}`);
});
