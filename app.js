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

const listarClientes=()=>{
    const clientes=JSON.parse(localStorage.getItem("clientes"));
}