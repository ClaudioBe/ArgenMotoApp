//para que se muestre en la etiqueta div con id container del archivo index.html
const registrarMotoHTML=(e)=>{
    e.preventDefault()
    document.getElementById('container').innerHTML=
    `<form onsubmit='registrarMoto(event)'>
        <label>Descripcion</label>
        <input id="descripcion" type="text" required={true}/>
        <label>Marca</label>
        <input id="marca" type="text" required={true}/>
        <label>Modelo</label>
        <input id="modelo" type="text" required={true}/>
        <label>Año</label>
        <input id="anio" type="number" required={true}/>
        <label>Kilometraje</label>
        <input id="kilometraje" type="number" required={true}/>
        <label>Nro de chasis</label>
        <input id="nro_chasis" type="text" required={true}/>
        <label>Stock actual</label>
        <input id="stock_actual" type="number" required={true}/>
        <label>Stock Minimo</label>
        <input id="stock_minimo" type="number" required={true}/>
        <label>Stock Maximo</label>
        <input id="stock_maximo" type="number" required={true}/>
        <label>Precio</label>
        <input id="precio" type="number" required={true}/>
        <button type='submit'>Registrar</button>
    </form>`
}


const registrarMoto=async (e)=>{
    e.preventDefault();
    const moto={
        descripcion:document.getElementById("descripcion").value,
        marca:document.getElementById("marca").value,
        modelo:document.getElementById("modelo").value,
        anio:document.getElementById("anio").value,
        kilometraje:document.getElementById("kilometraje").value,
        nro_chasis:document.getElementById("nro_chasis").value,
        stock_actual:document.getElementById("stock_actual").value,
        stock_minimo:document.getElementById("stock_minimo").value,
        stock_maximo:document.getElementById("stock_maximo").value,
        precio:document.getElementById("precio").value 
    }
    const response=await fetch('http://localhost:3001/motos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(moto)
})
if(response.ok) {
    //Elimino el contenido de los inputs para poder seguir con los registros 
    document.getElementById("descripcion").value = '';
    document.getElementById("marca").value = '';
    document.getElementById("modelo").value = '';
    document.getElementById("anio").value = '';
    document.getElementById("kilometraje").value = '';
    document.getElementById("nro_chasis").value = '';
    document.getElementById("stock_actual").value = '';
    document.getElementById("stock_minimo").value = '';
    document.getElementById("stock_maximo").value = '';
    document.getElementById("precio").value = '';
    alert("Moto registrada con éxito!")
}else{
    alert("Ya existe una moto registrado con ese nro de chasis!")
}
}

const modificarMotoHTML = async(nro_chasis) => {
    const response = await fetch(`http://localhost:3001/motos/${nro_chasis}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
    })
    const moto= await response.json();
    document.getElementById('container').innerHTML =
    `<form onsubmit='modificarMoto(event, "${nro_chasis}")'>
        <label>Descripcion</label>
        <input id="descripcion" type="text" value='${moto.descripcion}' required/>
        <label>Marca</label>
        <input id="marca" type="text" value='${moto.marca}' required/>
        <label>Modelo</label>
        <input id="modelo" type="text" value='${moto.modelo}' required/>
        <label>Año</label>
        <input id="anio" type="number" value='${moto.anio}' required/>
        <label>Kilometraje</label>
        <input id="kilometraje" type="number" value='${moto.kilometraje}' required/>
        <label>Stock actual</label>
        <input id="stock_actual" type="number" value='${moto.stock_actual}' required/>
        <label>Stock Minimo</label>
        <input id="stock_minimo" type="number" value='${moto.stock_minimo}' required/>
        <label>Stock Maximo</label>
        <input id="stock_maximo" type="number" value='${moto.stock_maximo}' required/>
        <label>Precio</label>
        <input id="precio" type="number" value='${moto.precio}' required/>
        <button type="submit">Confirmar cambios</button>
        <button onclick='listarMotos(event)'>Cancelar</button>
    </form>`;
}

const modificarMoto = async(e,nro_chasis) => {
    e.preventDefault();
    const motoModificada = {
        descripcion: document.getElementById("descripcion").value,
        marca: document.getElementById("marca").value,
        modelo: document.getElementById("modelo").value,
        anio: document.getElementById("anio").value,
        kilometraje: document.getElementById("kilometraje").value,
        nro_chasis,
        stock_actual: document.getElementById("stock_actual").value,
        stock_minimo: document.getElementById("stock_minimo").value,
        stock_maximo: document.getElementById("stock_maximo").value,
        precio: document.getElementById("precio").value
    };
    const response=await fetch(`http://localhost:3001/motos/${nro_chasis}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(motoModificada)
    })
    if(response.ok) { 
        alert("Moto modificado con éxito!")
        return listarMotos(e);
    }
    else alert("Ya hay una moto registrado con ese nro de chasis!")  
}


const listarMotos=async(e)=>{
    e.preventDefault()
    const response= await fetch(`http://localhost:3001/motos`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
    })
    const motos= await response.json()
    document.getElementById("container").innerHTML=motos.length==0
    ?`<div><h1>No hay motos registradas</h1></div>` 
    :motos.map(m=>
         `<div>
             <h2>Descripcion: ${m.descripcion}</h2>
             <h2>Marca: ${m.marca}</h2>
             <h2>Modelo: ${m.modelo}</h2>
             <h2>Año: ${m.anio}</h2>
             <h2>Kilometraje: ${m.kilometraje}</h2>
             <h2>Nro Chasis: ${m.nro_chasis}</h2>
             <h2>Stock Actual: ${m.stock_actual}</h2>
             <h2>Stock Minimo: ${m.stock_minimo}</h2>
             <h2>Stock Maximo: ${m.stock_maximo}</h2>
             <h2>Precio: ${m.precio}</h2>
             <button style="background-color:red" onclick='eliminarMoto("${m.nro_chasis}")'>Eliminar</button>
             <button onclick='modificarMotoHTML("${m.nro_chasis}")'>Modificar</button>
        </div>`
    )
}

const consultarMoto=async(e,nro_chasis)=>{
    e.preventDefault()
    const response= await fetch(`http://localhost:3001/motos/${nro_chasis}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
    })

    const m = await response.json();

    document.getElementById("container").innerHTML=m==null
    ?`<div><h2>No hay moto registrada con ese ID</h2></div>`
    :`<div>
            <h2>Descripcion: ${m.descripcion}</h2>
            <h2>Marca: ${m.marca}</h2>
            <h2>Modelo: ${m.modelo}</h2>
            <h2>Año: ${m.anio}</h2>
            <h2>Kilometraje: ${m.kilometraje}</h2>
            <h2>Nro Chasis: ${m.nro_chasis}</h2>
            <h2>Stock Actual: ${m.stock_actual}</h2>
            <h2>Stock Minimo: ${m.stock_minimo}</h2>
            <h2>Stock Maximo: ${m.stock_maximo}</h2>
            <h2>Precio: ${m.precio}</h2>
            <button onclick='modificarMotoHTML("${m.nro_chasis}")'>Modificar</button>
        </div>`
}

const eliminarMoto=async(nro_chasis)=>{
    await fetch(`http://localhost:3001/motos/${nro_chasis}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' }
    })
    listarMotos(new Event('click'))
}
