const registrarCliente=()=>{
    const clientes=JSON.parse(localStorage.getItem("clientes"));
    const cliente={
        nombre:document.getElementById("nombre").value,
        apellido:document.getElementById("apellido").value,
        DNI:document.getElementById("DNI").value,
        provincia:document.getElementById("provincia").value,
        localidad:document.getElementById("localidad").value,
        domicilio:document.getElementById("domicilio").value 
    }
    clientes.push(cliente)
    localStorage.setItem("clientes",JSON.stringify(clientes))
}

const registrarMoto=()=>{
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
}

const listarClientes=()=>{
    const clientes=JSON.parse(localStorage.getItem("clientes"));
}