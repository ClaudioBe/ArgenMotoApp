const registrarClienteHTML=(e)=>{
    e.preventDefault()
    document.getElementById('container').innerHTML=
    `<form onsubmit='registrarCliente(event)'>
        <label>Nombre</label>
        <input id="nombre" type="text" required/>
        <label>Apellido</label>
        <input id="apellido" type="text" required/>
        <label>DNI</label>
        <input id="DNI" type="number" required/>
        <label>Provincia</label>
        <input id="provincia" type="text" required/>
        <label>Localidad</label>
        <input id="localidad" type="text" required/>
        <label>Domicilio</label>
        <input id="domicilio" type="text" required/>
        <button type='submit'>Registrar</button>
    </form>`
}

const registrarCliente=async(e)=>{
    e.preventDefault()
    
    const cliente={
        nombre:document.getElementById("nombre").value,
        apellido:document.getElementById("apellido").value,
        DNI:document.getElementById("DNI").value,
        provincia:document.getElementById("provincia").value,
        localidad:document.getElementById("localidad").value,
        domicilio:document.getElementById("domicilio").value 
    }
    
    const response=await fetch('http://localhost:3001/clientes', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(cliente)
    })
    if(response.ok) {
        //Elimino el contenido de los inputs para poder seguir con los registros 
        document.getElementById("nombre").value = '';
        document.getElementById("apellido").value = '';
        document.getElementById("DNI").value = '';
        document.getElementById("provincia").value = '';
        document.getElementById("localidad").value = '';
        document.getElementById("domicilio").value = '';
        alert("Cliente registrado con éxito!")
    }else{
        alert("Ya existe un cliente registrado con ese DNI!")
    }
}
const modificarClienteHTML=async(DNI)=>{
    const response = await fetch(`http://localhost:3001/clientes/${DNI}`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
        }
    )
    const c= await response.json();
    document.getElementById('container').innerHTML=
    `<form onsubmit='modificarCliente(event,${DNI})'>
        <label>Nombre</label>
        <input id="nombre" type="text" value='${c.nombre}' required={true}/>
        <label>Apellido</label>
        <input id="apellido" type="text"  value='${c.apellido}' required={true}/>
        <label>Provincia</label>
        <input id="provincia" type="text"  value='${c.provincia}' required={true}/>
        <label>Localidad</label>
        <input id="localidad" type="text"  value='${c.localidad}' required={true}/>
        <label>Domicilio</label>
        <input id="domicilio" type="text"  value='${c.domicilio}' required={true}/>
        <button type="submit">Confirmar cambios</button>
        <button onclick='listarClientes(event)'>Cancelar</button>
    </form>`
    
}

const modificarCliente=async (e,DNI)=>{
    e.preventDefault()
    
    const cliente={
        nombre:document.getElementById("nombre").value,
        apellido:document.getElementById("apellido").value,
        DNI,
        provincia:document.getElementById("provincia").value,
        localidad:document.getElementById("localidad").value,
        domicilio:document.getElementById("domicilio").value 
    }
    const response=await fetch(`http://localhost:3001/clientes/${DNI}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(cliente)
    })
    if(response.ok) { 
        alert("Cliente modificado con éxito!")
        return listarClientes(e);
    }
    else alert("Ya hay un cliente registrado con ese DNI!")       
}


const listarClientes=async(e)=>{
    e.preventDefault()
    const response= await fetch(`http://localhost:3001/clientes/`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
    })
    const clientes= await response.json()
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
             <button style='background-color:red' onclick='eliminarCliente(${c.DNI})'>Eliminar</button>
             <button onclick='modificarClienteHTML(${c.DNI})'>Modificar</button>
        </div>`
    )
}

const consultarCliente=async (e,DNI)=>{
    e.preventDefault()
    const response= await fetch(`http://localhost:3001/clientes/${DNI}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
    })
    const c=await response.json()
   
    document.getElementById("container").innerHTML=c==null
    ?`<div><h2>No hay cliente registrado con ese DNI</h2></div>`
    :`<div>
             <h2>Nombre: ${c.nombre}</h2>
             <h2>Apellido: ${c.apellido}</h2>
             <h2>DNI: ${c.DNI}</h2>
             <h2>Provincia: ${c.provincia}</h2>
             <h2>Localidad: ${c.localidad}</h2>
             <h2>Domicilio: ${c.domicilio}</h2>
             <button onclick='modificarClienteHTML(${c.DNI})'>Modificar</button>
    </div>`
}

const eliminarCliente=async (DNI)=>{
    await fetch(`http://localhost:3001/clientes/${DNI}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' }
    })
    listarClientes(new Event('click'))
}
