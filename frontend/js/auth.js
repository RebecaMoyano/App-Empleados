import {hacerLogin} from './api.js'; 
import {hacerRegistro} from './api.js';

const form = document.getElementById("form"); 
const botonRegistro = document.getElementById("button-register");

//se autentifica el login de usuario 
export function autenticacionUsuario(){
    const form = document.getElementById("form");
    const mensaje = document.getElementById("mensaje-error");

    if(!form) return; 

    form.addEventListener('submit', async(e) => {
        const email = document.getElementById("email").value;    
        const password = document.getElementById("password").value;
        //si obtuvimos una respuesta valida de la API 
        try{
            const respuesta = await hacerLogin(email,password);
            if(!respuesta.ok){
                mensaje.style.color = "red";
                mensaje.textContent = respuesta.mensaje;
                /*opcion temporal 
                form.reset(); 
                return;*/
            }
            mensaje.style.color = "green";
            mensaje.textContent = respuesta.mensaje;
        }catch(error){
            mensaje.style.color = "red";
            //mensaje.textContent = "Tiene error pero no se cual es"; 
            mensaje.textContent = "Error: "+error.mensaje;

        }
    })
}

botonRegistro.addEventListener('click', async(e) => {
    e.preventDefault();
    hacerRegistro();
});

form.addEventListener('submit' , async(e) => {
    e.preventDefault(); 
    await autenticacionUsuario();
})