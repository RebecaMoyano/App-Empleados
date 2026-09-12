require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');


const app = express();
const PORT = 3000;

// Middleware para permitir comunicación entre frontend y backend y leer JSON
app.use(cors());
app.use(express.json());

// backend está dentro de frontend, por eso el frontend está un nivel arriba.
app.use(express.static(path.join(__dirname, '..', 'frontend')));

// Ruta de prueba para comprobar que la API responde
app.get('/api/status', (req, res) => {
    res.json({ mensaje: 'El servidor de la app corporativa está activo' });
});

app.post('/api/login', (req, res) => {
    const { email } = req.body;
    res.json({ mensaje: `Login recibido para ${email}` });
});

app.listen(PORT, () => { //si todo salió bien 
    console.log(`Servidor corporativo corriendo en http://localhost:${PORT}`);
});
