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
        <label>Anio</label>
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