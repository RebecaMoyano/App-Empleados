import {autenticacionLogin} from './js/auth.js';
//si pudimos acceder a la api 
async function comprobarConexion(){
    try{    
        const respuesta = await fetch('http://localhost:3000/api/status'); 
        if(!respuesta.ok){
            throw new Error("Algo falló conn el servidor");
        }
        const datos = await respuesta.json();
        document.getElementById("estado-conexion").textContent = datos.mensaje;
    }catch(error){
        document.getElementById("estado-conexion").textContent =
            "No se pudo conectar con el servidor.";
    }
}
comprobarConexion();    
autenticacionLogin(); 
