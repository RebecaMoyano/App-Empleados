//archivo para peticiones FETCH 
//se define el login 
export async function hacerLogin(email,password){
    const respuesta = await fetch('http://localhost:3000/api/login', {
        method : 'POST',
        headers :{
            'Content-Type':'application/json'},
        body:JSON.stringify({email,password})
    });
    const datos = await respuesta.json();
    return datos;
}

export async function hacerRegistro(email,password){
    const respuesta = await fetch('http://localhost:3000/api/registro', {
        method : 'POST',
        headers :{ 
            'Content-Type':'application/json'},
        body:JSON.stringify({email,password})
    })
    return await respuesta.json();
};
