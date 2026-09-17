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

function validarCredenciales(req, res, next) {
    let { email, password } = req.body;
    const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    // 1. Validacion del Email
    if (!email || typeof email !== 'string'){
        return res.status(400).json({ ok: false, mensaje: 'El correo electrónico es obligatorio.' });
    }
    email = email.trim().toLowerCase();
    if (!regexEmail.test(email)) {
        return res.status(400).json({ ok: false, mensaje: 'El email no es válido. Ingrese uno válido.' });
    }
    // 2. Validaciones de la Contraseña
    if (!password || typeof password !== 'string') {
        return res.status(400).json({ ok: false, mensaje: 'La contraseña es obligatoria.' });
    }
    const passwordLimpia = password.trim();
    if (passwordLimpia === '') {
        return res.status(400).json({ ok: false, mensaje: 'La contraseña no puede estar vacía.' });
    }
    if (passwordLimpia.length < 6) {
        return res.status(400).json({ ok: false, mensaje: 'La contraseña debe tener al menos 6 caracteres.' });
    }
    // Guardo los datos limpios en la petición para consumirlos en las rutas
    req.body.email = email;
    req.body.password = passwordLimpia;
    // Continuo con el siguiente handler
    next();
}

// Endpoint de Registro (Pasa primero por el middleware validarCredenciales)
app.post('/api/registro', validarCredenciales, (req, res) => {
    const { email } = req.body;
    return res.status(201).json({ 
        ok: true, 
        mensaje: `Registro exitoso para ${email}` 
    });
});
app.listen(PORT, () => { //si todo salió bien 
    console.log(`Servidor corporativo corriendo en http://localhost:${PORT}`);
});
