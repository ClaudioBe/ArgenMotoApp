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

const modificarVendedorHTML=(CUIT)=> {
    const vendedores = JSON.parse(localStorage.getItem("vendedores"));
    const vendedor = vendedores.find(v => v.CUIT == CUIT);
    
    document.getElementById('container').innerHTML =
    `<form onsubmit='modificarVendedor(event, ${CUIT})'>
        <label>CUIT</label>
        <input id="CUIT" type="number" value='${vendedor.CUIT}' readonly required />
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

const modificarVendedor=(e, CUIT)=> {
    e.preventDefault();
    const vendedores = JSON.parse(localStorage.getItem('vendedores'));

    // Filtra el vendedor que se va a modificar
    const vendedoresActualizados = vendedores.filter(v => v.CUIT != CUIT);

    const vendedorModificado = {
        nombre: document.getElementById("nombre").value,
        apellido: document.getElementById("apellido").value,
        CUIT: CUIT,  // Mantenemos el mismo CUIT
        provincia: document.getElementById("provincia").value,
        localidad: document.getElementById("localidad").value,
        domicilio: document.getElementById("domicilio").value,
        email: document.getElementById("email").value
    };

    // Agrega el vendedor modificado a la lista
    vendedoresActualizados.push(vendedorModificado);
    localStorage.setItem("vendedores", JSON.stringify(vendedoresActualizados));

    alert("Vendedor modificado con éxito!");
    listarVendedores(new Event('click'));
}

const listarVendedores=(e)=>{
    e.preventDefault()
    const vendedores=JSON.parse(localStorage.getItem("vendedores"));
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
             <button style='color:red' onclick='eliminarVendedor(${v.CUIT})'>Eliminar</button>
             <button onclick='modificarVendedorHTML(${v.CUIT})'>Modificar</button>

        </div>`
    )
}

const consultarVendedor=(e,CUIT)=>{
    e.preventDefault()
    const vendedores=JSON.parse(localStorage.getItem("vendedores"));
    const vendedor=vendedores.find(v=>v.CUIT==CUIT);
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
