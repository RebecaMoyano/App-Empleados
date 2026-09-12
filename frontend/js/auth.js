import {hacerLogin} from './api.js'; 

const form = document.getElementById("form"); 

form.addEventListener('submit' , async(e) => {
    e.preventDefault(); 
    const email = document.getElementById('email').value;
    const password= document.getElementById('password').value;  
    const mensaje = document.getElementById('mensaje-error');

    try {
        const resultado = await hacerLogin(email,password);
        mensaje.textContent = resultado.mensaje;
        mensaje.style.color = 'green';
    } catch (error) {
        mensaje.textContent = 'No se pudo realizar el login.';
        mensaje.style.color = 'red';
        console.error(error);
    }
})