const registrarClienteHTML=(e)=>{
    e.preventDefault()
    document.getElementById('container').innerHTML=
    `<form>
        <label>Nombre</label>
        <input id="nombre" type="text" required={true}/>
        <label>Apellido</label>
        <input id="apellido" type="text" required={true}/>
        <label>DNI</label>
        <input id="DNI" type="number" required={true}/>
        <label>Provincia</label>
        <input id="provincia" type="text" required={true}/>
        <label>Localidad</label>
        <input id="localidad" type="text" required={true}/>
        <label>Domicilio</label>
        <input id="domicilio" type="text" required={true}/>
        <button onclick="registrarCliente(event)">Registrar</button>
    </form>`
}

const registrarCliente=(e)=>{
    e.preventDefault()
    const clientes=JSON.parse(localStorage.getItem("clientes"));
    const cliente={
        nombre:document.getElementById("nombre").value,
        apellido:document.getElementById("apellido").value,
        DNI:document.getElementById("DNI").value,
        provincia:document.getElementById("provincia").value,
        localidad:document.getElementById("localidad").value,
        domicilio:document.getElementById("domicilio").value 
    }
    const existe=clientes.some(c =>c.DNI===cliente.DNI);
    if(existe) {alert("Ya existe un cliente registrado con este DNI!"); return}

    clientes.push(cliente)
    localStorage.setItem("clientes",JSON.stringify(clientes))
    //Elimino el contenido de los inputs para poder seguir con los registros 
    document.getElementById("nombre").value = '';
    document.getElementById("apellido").value = '';
    document.getElementById("DNI").value = '';
    document.getElementById("provincia").value = '';
    document.getElementById("localidad").value = '';
    document.getElementById("domicilio").value = '';
    alert("Cliente registrado con éxito!")
}

const listarClientes=(e)=>{
    e.preventDefault()
    const clientes=JSON.parse(localStorage.getItem("clientes"));
    document.getElementById("container").innerHTML=clientes.length==0
    ?`<div><h1>No hay clientes registrados</h1></div>` 
    :clientes.map(c=>
         `<div>
             <h2>Nombre: ${c.nombre}</h2>
             <h2>Apellido: ${c.apellido}</h2>
             <h2>DNI: ${c.DNI}</h2>
             <h2>Provincia: ${c.provincia}</h2>
             <h2>Localidad: ${c.localidad}</h2>
             <h2>Domicilio: ${c.domicilio}</h2>
             <button style='color:red' onclick='eliminarCliente(${c.DNI})'>Eliminar</button>
        </div>`
    )
}

const consultarCliente=(DNI)=>{
    const clientes=JSON.parse(localStorage.getItem("clientes"));
    const cliente=clientes[clientes.indexOf(DNI)];
    document.getElementById("container").innerHTML=cliente==null
    ?`<div><h2>No hay cliente registrado con ese DNI</h2></div>`
    :`<div>
             <h2>Nombre: ${c.nombre}</h2>
             <h2>Apellido: ${c.apellido}</h2>
             <h2>DNI: ${c.DNI}</h2>
             <h2>Provincia: ${c.provincia}</h2>
             <h2>Localidad: ${c.localidad}</h2>
             <h2>Domicilio: ${c.domicilio}</h2>
        </div>`
}

const eliminarCliente=(DNI)=>{
    const clientes=JSON.parse(localStorage.getItem("clientes"));
    localStorage.setItem("clientes",JSON.stringify(clientes.filter(c=>c.DNI!=DNI)));
    listarClientes(new Event('click'))
}