const registrarFacturaHTML = (e) => {
    e.preventDefault();
    const IDmotos=JSON.parse(localStorage.getItem('motos'))?.map(m=>m.id)
    document.getElementById('container').innerHTML = `
    <form onsubmit="registrarFactura(event)">

        <label>Fecha</label>
        <input id="FechaEmision" type="date" required/>

        <label>DNI Cliente</label>
        <input id="ClienteDNI" type="number" required/>

        <label>CUIT vendedor</label>
        <input id="cuitVendedor" type="number" required/>

        <label>ID Moto</label>
        <select id='IdMoto'>
            ${IDmotos.map(id=>`<option>${id}</option>`)}
        </select>

        <label>Detalle</label>
        <input id="Detalle" type="text" required/>

        <label>Total</label>
        <input id="Total" type="number" step="0.01" required/>

        <label>Método de Pago</label>
        <select id="MetodoPago" required>
            <option value="efectivo">Efectivo</option>
            <option value="transferencia">Transferencia bancaria</option>
            <option value="tarjeta">Tarjeta de crédito/débito</option>
        </select>

        <label>Estado</label>
        <select id="Estado" required>
            <option value="pendiente">Pendiente</option>
            <option value="pagado">Pagado</option>
            <option value="cancelado">Cancelado</option>
        </select>

        <label>Tipo de Factura</label>
        <input id="TipoFactura" type="text" maxlength="1" required/>

        <button type="submit">Registrar Factura</button>
    </form>`;
};

// Función para registrar una factura
const registrarFactura = (e) => {
    e.preventDefault();
    let facturas = JSON.parse(localStorage.getItem("facturas")) || [];
    const DNIclientes=JSON.parse(localStorage.getItem('clientes')).map(c=>parseInt(c.DNI))
    const cuitsVendedores=JSON.parse(localStorage.getItem('vendedores')).map(v=>parseInt(v.CUIT))

    // Capturar los valores de los campos del formulario
    const factura = {
        id:facturas.length?facturas[facturas.length-1].id + 1:1,
        fecha: document.getElementById("FechaEmision").value,
        clienteDNI: document.getElementById("ClienteDNI").value,
        cuitVendedor: document.getElementById("cuitVendedor").value,
        idMoto: parseInt(document.getElementById("IdMoto").value),
        detalle: document.getElementById("Detalle").value,
        total: parseFloat(document.getElementById("Total").value),
        metodoPago: document.getElementById("MetodoPago").value,
        estado: document.getElementById("Estado").value,
        tipoFactura: document.getElementById("TipoFactura").value
    };

    //si existe un cliente con ese DNI
    if(DNIclientes.includes(factura.clienteDNI)){alert("No existe un cliente con el DNI ingresado!"); return}
    if(cuitsVendedores.includes(factura.cuitVendedor)){alert("No existe un vendedor con el cuit ingresado!");return}
    // Agregar la nueva factura al array de facturas
    facturas.push(factura);
    localStorage.setItem("facturas", JSON.stringify(facturas))
    // Limpiar los inputs del formulario
    document.getElementById("FechaEmision").value = '';
    document.getElementById("ClienteDNI").value = '';
    document.getElementById('cuitVendedor').value='';
    document.getElementById("IdMoto").value = '';
    document.getElementById("Detalle").value = '';
    document.getElementById("Total").value = '';
    document.getElementById("MetodoPago").value = '';
    document.getElementById("Estado").value = '';
    document.getElementById("TipoFactura").value = '';

    alert("Factura registrada con éxito!");
    
};


const listarFacturas = (e) => {
    e.preventDefault();
    const facturas = JSON.parse(localStorage.getItem("facturas")) || [];
    
    document.getElementById("container").innerHTML = facturas.length === 0
    ? `<div><h1>No hay facturas registradas</h1></div>`
    : facturas.map(f =>
        `<div>
            <h2>Factura ID: ${f.id}</h2>
            <h3>Fecha de Emisión: ${f.fecha}</h3>
            
            <p>Cliente ID:</p> <a href="" onclick='consultarCliente(event,${f.clienteDNI})'>${f.clienteDNI}</a>
            <p>CUIT vendedor:</p> <a href="" onclick='consultarVendedor(event,${f.cuitVendedor})'>${f.cuitVendedor}</a>
            <h4>Detalle:</h4>
            <p>ID Moto:</p> <a href="" onclick='consultarMoto(event, ${f.idMoto})'>${f.idMoto}</a>
            <p>Descripción: ${f.detalle}</p>
            
            <p>Total: ${f.total}</p>

            <h4>Método de Pago: ${f.metodoPago}</h4>
            <p>Estado: ${f.estado}</p>
            <p>Tipo de Factura: ${f.tipoFactura}</p>
            
            <button style='color:red' onclick='eliminarFactura(${f.id})'>Eliminar</button>
        </div>`
    ).join('');
}



// Función para consultar una factura por ID
const consultarFactura = (id) => {
    const facturas = JSON.parse(localStorage.getItem("facturas")) || [];
    const factura = facturas.find(f => f.id === id);

    document.getElementById("container").innerHTML = factura == null
    ? `<div><h2>No hay factura registrada con ese ID</h2></div>`
    : `<div>
            <h2>Factura ID: ${factura.id}</h2>
            <h3>Fecha de Emisión: ${factura.fecha}</h3>

            <h4>Datos del Cliente:</h4>
            <p>Cliente ID: ${factura.clienteDNI}</p>

            <h4>Detalle:</h4>
            <p>ID Moto: ${factura.idMoto}</p>
            <p>Descripción: ${factura.detalle}</p>

            <p>Total: ${factura.total}</p>
            <p>Método de Pago: ${factura.metodoPago}</p>
            <p>Estado: ${factura.estado}</p>
            <p>Tipo de Factura: ${factura.tipoFactura}</p>
        </div>`;
}

// Función para eliminar una factura por ID
const eliminarFactura = (id) => {
    const facturas = JSON.parse(localStorage.getItem("facturas")) || [];
    const nuevasFacturas = facturas.filter(f => f.id !== id);
    localStorage.setItem("facturas", JSON.stringify(nuevasFacturas));

    listarFacturas(new Event('click')); // Actualiza la lista de facturas
}
