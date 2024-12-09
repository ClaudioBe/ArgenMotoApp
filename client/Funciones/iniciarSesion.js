const iniciarSesionHTML=(e)=>{
    e.preventDefault();
    alert('click en iniciar sesion')
    // document.getElementById('container').innerHTML=
    // `<form onsubmit='iniciarSesion(e)'>
    //     <label>Contraseña:</label>
    //     <input id='password' type='password'></input>
    //     <button type='submit'>Iniciar Sesión</button>
    // </form>`
}
const iniciarSesion=(e)=>{
    e.preventDefault();
    JSON.parse(localStorage.getItem('contraseña'))===hashPassword(document.getElementById('password').value)
        ?document.getElementById('navbar').innerHTML=
            `<a href="" onclick="listarFacturas(event)">Facturas</a>
            <a href="" onclick="listarClientes(event)">Clientes</a>
            <a href="" onclick="listarTurnos(event)">Turnos</a>
            <a href="" onclick="listarVendedores(event)">Vendedores</a>
            <a href="" onclick="listarMotos(event)">Motos</a>
            <a href='' onclick="registrarClienteHTML(event)">Registrar Cliente</a>
            <a href='' onclick="registrarVendedorHTML(event)">Registrar Vendedor</a>
            <a href="" onclick="registrarMotoHTML(event)">Registrar Moto</a>
            <a href="" onclick="registrarFacturaHTML(event)">Registrar Factura</a>`
        :alert("Contraseña incorrecta!")
}


const hashPassword=(password)=> { 
    let hash = 0; 
    for (let i = 0; i < password.length; i++) { 
        //guardo en char el codigo ascii de i(cada caracter de la contraseña)
        const char = password.charCodeAt(i); 
        //le asigno a hash, la mitad de su valor mas el codigo ascii de el caracter actual
        hash = hash/2 + char;
    } 
    //convierto lo que hay en hash a hexadecimal
    return hash.toString(16); 
} 