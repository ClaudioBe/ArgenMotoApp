const registrarVendedorHTML=(e)=>{
    e.preventDefault()
    document.getElementById('container').innerHTML=
    `<form onsubmit='registrarVendedor(event)'>
        <label>CUIT</label>
        <input id="CUIT" type="number" required={true}/>
        <label>Nombre</label>
        <input id="nombre" type="text" required={true}/>
        <label>Apellido</label>
        <input id="apellido" type="text" required={true}/>
        <label>Provincia</label>
        <input id="provincia" type="text" required={true}/>
        <label>Localidad</label>
        <input id="localidad" type="text" required={true}/>
        <label>Domicilio</label>
        <input id="domicilio" type="text" required={true}/>
        <label>Email</label>
        <input id="email" type="text" required={true}/>
        <button type='submit'>Registrar</button>
    </form>`
}

const registrarVendedor=async(e)=>{
    e.preventDefault()
    const vendedor={
        nombre:document.getElementById("nombre").value,
        apellido:document.getElementById("apellido").value,
        CUIT:document.getElementById("CUIT").value,
        provincia:document.getElementById("provincia").value,
        localidad:document.getElementById("localidad").value,
        domicilio:document.getElementById("domicilio").value,
        email:document.getElementById("email").value
    }
    const response=await fetch('http://localhost:3001/vendedores', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(vendedor)
    })
    if(response.ok) {
        //Elimino el contenido de los inputs para poder seguir con los registros 
        document.getElementById("nombre").value = '';
        document.getElementById("apellido").value = '';
        document.getElementById("CUIT").value = '';
        document.getElementById("provincia").value = '';
        document.getElementById("localidad").value = '';
        document.getElementById("domicilio").value = '';
        document.getElementById("email").value = '';
        alert("Vendedor registrado con éxito!")
    }else{
        alert("Ya existe un vendedor registrado con ese CUIT!")
    }
}

const modificarVendedorHTML=async(CUIT)=> {
    const response = await fetch(`http://localhost:3001/vendedores/${CUIT}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
        }
    )
    const vendedor= await response.json();
    document.getElementById('container').innerHTML =
    `<form onsubmit='modificarVendedor(event, ${CUIT})'>
        <label>Nombre</label>
        <input id="nombre" type="text" value='${vendedor.nombre}' required />
        <label>Apellido</label>
        <input id="apellido" type="text" value='${vendedor.apellido}' required />
        <label>Provincia</label>
        <input id="provincia" type="text" value='${vendedor.provincia}' required />
        <label>Localidad</label>
        <input id="localidad" type="text" value='${vendedor.localidad}' required />
        <label>Domicilio</label>
        <input id="domicilio" type="text" value='${vendedor.domicilio}' required />
        <label>Email</label>
        <input id="email" type="text" value='${vendedor.email}' required />
        <button type="submit">Confirmar cambios</button>
        <button type="button" onclick='listarVendedores(event)'>Cancelar</button>
    </form>`;
}

const modificarVendedor=async(e, CUIT)=> {
    e.preventDefault();

    const vendedorModificado = {
        nombre: document.getElementById("nombre").value,
        apellido: document.getElementById("apellido").value,
        CUIT,
        provincia: document.getElementById("provincia").value,
        localidad: document.getElementById("localidad").value,
        domicilio: document.getElementById("domicilio").value,
        email: document.getElementById("email").value
    };

    const response=await fetch(`http://localhost:3001/vendedores/${CUIT}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(vendedorModificado)
    })
    if(response.ok) { 
        alert("Vendedor modificado con éxito!")
        return listarVendedores(e);
    }
    else alert("Ya hay un vendedor registrado con ese CUIT!") 
}

const listarVendedores=async(e)=>{
    e.preventDefault()
    const response= await fetch(`http://localhost:3001/vendedores`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
    })
    const vendedores= await response.json()
    document.getElementById("container").innerHTML=vendedores.length==0
    ?`<div><h1>No hay vendedores registrados</h1></div>` 
    :vendedores.map(v=>
         `<div>
             <h2>Nombre: ${v.nombre}</h2>
             <h2>Apellido: ${v.apellido}</h2>
             <h2>CUIT: ${v.CUIT}</h2>
             <h2>Provincia: ${v.provincia}</h2>
             <h2>Localidad: ${v.localidad}</h2>
             <h2>Domicilio: ${v.domicilio}</h2>
             <h2>Email: ${v.email}</h2>
             <button style='background-color:red' onclick='eliminarVendedor(${v.CUIT})'>Eliminar</button>
             <button onclick='modificarVendedorHTML(${v.CUIT})'>Modificar</button>

        </div>`
    )
}

const consultarVendedor=async (e,CUIT)=>{
    e.preventDefault()
    const response= await fetch(`http://localhost:3001/vendedores/${CUIT}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
    })
    const v= await response.json()

    document.getElementById("container").innerHTML=v==null
    ?`<div><h2>No hay vendedor registrado con ese CUIT</h2></div>`
    :`<div>
             <h2>Nombre: ${v.nombre}</h2>
             <h2>Apellido: ${v.apellido}</h2>
             <h2>CUIT: ${v.CUIT}</h2>
             <h2>Provincia: ${v.provincia}</h2>
             <h2>Localidad: ${v.localidad}</h2>
             <h2>Domicilio: ${v.domicilio}</h2>
             <h2>Email: ${v.email}</h2>
             <button onclick='modificarVendedorHTML(${v.CUIT})'>Modificar</button>
        </div>`
}

const eliminarVendedor=async(CUIT)=>{
    await fetch(`http://localhost:3001/vendedores/${CUIT}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' }
    })
    listarClientes(new Event('click'))
}
