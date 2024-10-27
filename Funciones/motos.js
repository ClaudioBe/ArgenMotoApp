//para que se muestre en la etiqueta div con id container del archivo index.html
const registrarMotoHTML=(e)=>{
    e.preventDefault()
    document.getElementById('container').innerHTML=
    `<form>
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
        <input id="nro_chasis" type="number" required={true}/>
        <label>Stock actual</label>
        <input id="stock_actual" type="number" required={true}/>
        <label>Stock Minimo</label>
        <input id="stock_minimo" type="number" required={true}/>
        <label>Stock Maximo</label>
        <input id="stock_maximo" type="number" required={true}/>
        <label>Precio</label>
        <input id="precio" type="number" required={true}/>
        <button onclick="registrarMoto(event)">Registrar</button>
    </form>`
}


const registrarMoto=(e)=>{
    e.preventDefault();
    const motos=JSON.parse(localStorage.getItem("motos"));
    const moto={
        id:motos.length + 1,
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
    motos.push(moto)
    localStorage.setItem("motos",JSON.stringify(motos))
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
}

const modificarMotoHTML = (id) => {
    const motos = JSON.parse(localStorage.getItem("motos"));
    const moto = motos.find(m => m.id == id);
    document.getElementById('container').innerHTML =
    `<form onsubmit='modificarMoto(event, ${id})'>
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
        <label>Nro de chasis</label>
        <input id="nro_chasis" type="number" value='${moto.nro_chasis}' required/>
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

const modificarMoto = (e, id) => {
    e.preventDefault();
    const motos = JSON.parse(localStorage.getItem("motos"));
    // Eliminamos la moto actual para luego añadir la versión modificada
    const motosActualizadas = motos.filter(m => m.id != id);

    const motoModificada = {
        id: id,
        descripcion: document.getElementById("descripcion").value,
        marca: document.getElementById("marca").value,
        modelo: document.getElementById("modelo").value,
        anio: parseInt(document.getElementById("anio").value),
        kilometraje: parseInt(document.getElementById("kilometraje").value),
        nro_chasis: document.getElementById("nro_chasis").value,
        stock_actual: parseInt(document.getElementById("stock_actual").value),
        stock_minimo: parseInt(document.getElementById("stock_minimo").value),
        stock_maximo: parseInt(document.getElementById("stock_maximo").value),
        precio: parseFloat(document.getElementById("precio").value)
    };

    // Guardamos la moto modificada en la lista
    motosActualizadas.push(motoModificada);
    localStorage.setItem("motos", JSON.stringify(motosActualizadas));

    alert("Moto modificada con éxito!");
    listarMotos(e);
}


const listarMotos=(e)=>{
    e.preventDefault()
    const motos=JSON.parse(localStorage.getItem("motos"));
    document.getElementById("container").innerHTML=motos.length==0
    ?`<div><h1>No hay motos registradas</h1></div>` 
    :motos.map(c=>
         `<div>
             <h2>Id: ${c.id}</h2>
             <h2>Descripcion: ${c.descripcion}</h2>
             <h2>Marca: ${c.marca}</h2>
             <h2>Modelo: ${c.modelo}</h2>
             <h2>Anio: ${c.anio}</h2>
             <h2>Kilometraje: ${c.kilometraje}</h2>
             <h2>Nro Chasis: ${c.nro_chasis}</h2>
             <h2>Stock Actual: ${c.stock_actual}</h2>
             <h2>Stock Minimo: ${c.stock_minimo}</h2>
             <h2>Stock Maximo: ${c.stock_maximo}</h2>
             <h2>Precio: ${c.precio}</h2>
             <button style='color:red' onclick='eliminarMoto(${c.id})'>Eliminar</button>
             <button onclick='modificarMotoHTML(${c.id})'>Modificar</button>

        </div>`
    )
}

const consultarMoto=(id)=>{
    const motos=JSON.parse(localStorage.getItem("motos"));
    const moto=motos[motos.indexOf(id)];
    document.getElementById("container").innerHTML=moto==null
    ?`<div><h2>No hay moto registrada con ese ID</h2></div>`
    :`<div>
            <h2>Id: ${c.id}</h2>
            <h2>Descripcion: ${c.descripcion}</h2>
            <h2>Marca: ${c.marca}</h2>
            <h2>Modelo: ${c.modelo}</h2>
            <h2>Anio: ${c.anio}</h2>
            <h2>Kilometraje: ${c.kilometraje}</h2>
            <h2>Nro Chasis: ${c.nro_chasis}</h2>
            <h2>Stock Actual: ${c.stock_actual}</h2>
            <h2>Stock Minimo: ${c.stock_minimo}</h2>
            <h2>Stock Maximo: ${c.stock_maximo}</h2>
            <h2>Precio: ${c.precio}</h2>
        </div>`
}

const eliminarMoto=(id)=>{
    const motos=JSON.parse(localStorage.getItem("motos"));
    localStorage.setItem("motos",JSON.stringify(motos.filter(c=>c.id!=id)));
    listarMotos(new Event('click'))
}
