const iniciarSesionHTML=(e)=>{
    e.preventDefault();

    document.getElementById('container').innerHTML=
    `<div>
        <button onclick="window.inicio()" class="bi bi-arrow-90deg-left"></button>
        <form onsubmit='iniciarSesion(event)'>
            <label>Contraseña:</label>
            <input id='password' type='password' required={true}></input>
            <button type='submit'>Iniciar Sesión</button>
        </form>
    </div>`
}
const iniciarSesion=async(e)=>{
    e.preventDefault();
    const admin = {
        contraseña:document.getElementById("password").value
    }
    const response=await fetch('http://localhost:3001/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(admin)
    })
   
    localStorage.setItem('isLoggedIn',JSON.stringify(response.ok));
    if(response.ok){
        window.inicio();
        alert("Sesión iniciada con éxito!")
    } 
    else alert("Contraseña incorrecta!")
}

const cerrarSesion=()=>{
    localStorage.setItem('isLoggedIn',JSON.stringify(false));
    window.inicio();
}