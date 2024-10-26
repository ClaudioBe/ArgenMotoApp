const registrarVendedorHTML=(e)=>{
    e.preventDefault()
    document.getElementById('container').innerHTML=
    `<form>
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
        <button onclick="registrarVendedor(event)">Registrar</button>
    </form>`
}

const registrarVendedor=(e)=>{
    e.preventDefault()
    const vendedores=JSON.parse(localStorage.getItem("vendedores"));
    const vendedor={
        nombre:document.getElementById("nombre").value,
        apellido:document.getElementById("apellido").value,
        CUIT:document.getElementById("CUIT").value,
        provincia:document.getElementById("provincia").value,
        localidad:document.getElementById("localidad").value,
        domicilio:document.getElementById("domicilio").value,
        email:document.getElementById("email").value
    }
    const existe=vendedores.some(c =>c.CUIT===vendedor.CUIT);
    if(existe) {alert("Ya existe un vendedor registrado con este CUIT!"); return}

    vendedores.push(vendedor)
    localStorage.setItem("vendedores",JSON.stringify(vendedores))
    //Elimino el contenido de los inputs para poder seguir con los registros 
    document.getElementById("nombre").value = '';
    document.getElementById("apellido").value = '';
    document.getElementById("CUIT").value = '';
    document.getElementById("provincia").value = '';
    document.getElementById("localidad").value = '';
    document.getElementById("domicilio").value = '';
    document.getElementById("email").value = '';
    alert("vendedor registrado con éxito!")
}

const listarVendedores=(e)=>{
    e.preventDefault()
    const vendedores=JSON.parse(localStorage.getItem("vendedores"));
    document.getElementById("container").innerHTML=vendedores.length==0
    ?`<div><h1>No hay vendedores registrados</h1></div>` 
    :vendedores.map(c=>
         `<div>
             <h2>Nombre: ${c.nombre}</h2>
             <h2>Apellido: ${c.apellido}</h2>
             <h2>CUIT: ${c.CUIT}</h2>
             <h2>Provincia: ${c.provincia}</h2>
             <h2>Localidad: ${c.localidad}</h2>
             <h2>Domicilio: ${c.domicilio}</h2>
             <h2>Email: ${c.email}</h2>
             <button style='color:red' onclick='eliminarVendedor(${c.CUIT})'>Eliminar</button>
        </div>`
    )
}

const consultarVendedor=(CUIT)=>{
    const vendedores=JSON.parse(localStorage.getItem("vendedores"));
    const vendedor=vendedores[vendedores.indexOf(CUIT)];
    document.getElementById("container").innerHTML=vendedor==null
    ?`<div><h2>No hay vendedor registrado con ese CUIT</h2></div>`
    :`<div>
             <h2>Nombre: ${c.nombre}</h2>
             <h2>Apellido: ${c.apellido}</h2>
             <h2>CUIT: ${c.CUIT}</h2>
             <h2>Provincia: ${c.provincia}</h2>
             <h2>Localidad: ${c.localidad}</h2>
             <h2>Domicilio: ${c.domicilio}</h2>
             <h2>Email: ${c.email}</h2>
        </div>`
}

const eliminarVendedor=(CUIT)=>{
    const vendedores=JSON.parse(localStorage.getItem("vendedores"));
    localStorage.setItem("vendedores",JSON.stringify(vendedores.filter(c=>c.CUIT!=CUIT)));
    listarVendedores(new Event('click'))
}
