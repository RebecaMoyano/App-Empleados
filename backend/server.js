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

//mejorar estas dos rutas para que hagan validaciones de email y password y unificarla en una sola funcion 
app.post('/api/login', (req, res) => {
    let { email, password } = req.body;
    const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const mensajeError = "El email no es válido. Ingrese uno válido.";
    if(!email || typeof email !== 'string' || !regexEmail.test(email)){
        return res.status(400).json({mensaje: mensajeError});
    }
    email = email.trim().toLowerCase();
    // 2. Validaciones de la Contraseña
    if (!password || typeof password !== 'string' || password.trim() === '' || password.length < 6) {
        return res.status(400).json({ ok: false, mensaje: 'La contraseña es requerida.' });
    }
    res.json({ mensaje: `Conexion con el servidor para el login de ${email} con exito` });
});

app.post('/api/registro', (req, res) => {
   let {email, password} = req.body; 
   const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
   const mensajeError = "El email no es válido. Ingrese uno válido.";
    if(!email || typeof email !== 'string' || !regexEmail.test(email)){
         return res.status(400).json({mensaje: mensajeError});
    }
    email = email.trim().toLowerCase();
    // 2. Validaciones de la Contraseña
    if (!password || typeof password !== 'string' || password.trim() === '' || password.length < 6) {
        return res.status(400).json({ ok: false, mensaje: 'La contraseña es requerida.' });
    }
    res.json({ mensaje: `Registro exitoso para ${email}` });
});

app.listen(PORT, () => { //si todo salió bien 
    console.log(`Servidor corporativo corriendo en http://localhost:${PORT}`);
});
