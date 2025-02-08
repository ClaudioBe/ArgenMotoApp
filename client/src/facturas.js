const registrarFacturaHTML = async(e) => {
    e.preventDefault();
    const res1= await fetch(`http://localhost:3001/clientes`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
    })
    const clientes= await res1.json()
    const DNIClientes=clientes.map(c=>c.DNI)

    const res2= await fetch(`http://localhost:3001/vendedores`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
    })
    const vendedores= await res2.json()
    const cuitsVendedores=vendedores.map(v=>v.CUIT)

    const res3= await fetch(`http://localhost:3001/motos`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
    })
    const motos= await res3.json()
    const chasisMotos=motos.map(m=>m.nro_chasis)

    document.getElementById('container').innerHTML = `
    <form onsubmit="registrarFactura(event)">

        <label>Fecha</label>
        <input id="fechaEmision" type="date" required/>

        <label>DNI Cliente</label>
        <select required id='clienteDNI'>
            ${DNIClientes?.map(DNI=>`<option>${DNI}</option>`)}
        </select>

        <label>CUIT vendedor</label>
        <select required id='cuitVendedor'>
            ${cuitsVendedores?.map(CUIT=>`<option>${CUIT}</option>`)}
        </select>

        <label>nro_chasis de moto</label>
        <select required id='nro_chasis'>
            ${chasisMotos?.map(nro_chasis=>`<option>${nro_chasis}</option>`)}
        </select>

        <label>Detalle</label>
        <input id="detalle" type="text" required/>

        <label>Total</label>
        <input id="total" type="number" step="0.01" required/>

        <label>Método de Pago</label>
        <select id="metodoPago" required>
            <option value="efectivo">Efectivo</option>
            <option value="transferencia">Transferencia bancaria</option>
            <option value="tarjeta">Tarjeta de crédito/débito</option>
        </select>

        <label>Estado</label>
        <select id="estado" required>
            <option value="pendiente">Pendiente</option>
            <option value="pagado">Pagado</option>
            <option value="cancelado">Cancelado</option>
        </select>

        <label>Tipo de Factura</label>
        <input id="tipoFactura" type="text" maxlength="1" required/>

        <button type="submit">Registrar Factura</button>
    </form>`;
};

// Función para registrar una factura
const registrarFactura = async(e) => {
    e.preventDefault();

    // Capturar los valores de los campos del formulario
    const factura = {
        fecha: document.getElementById("fechaEmision").value,
        clienteDNI: document.getElementById("clienteDNI").value,
        cuitVendedor: document.getElementById("cuitVendedor").value,
        nro_chasis: document.getElementById("nro_chasis").value,
        detalle: document.getElementById("detalle").value,
        total: document.getElementById("total").value,
        metodoPago: document.getElementById("metodoPago").value,
        estado: document.getElementById("estado").value,
        tipoFactura: document.getElementById("tipoFactura").value
    };

    const response=await fetch('http://localhost:3001/facturas', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(factura)
})
if(response.ok) {
    //Elimino el contenido de los inputs para poder seguir con los registros 
    document.getElementById("fechaEmision").value = '';
    document.getElementById("clienteDNI").value = '';
    document.getElementById('cuitVendedor').value='';
    document.getElementById("nro_chasis").value = '';
    document.getElementById("detalle").value = '';
    document.getElementById("total").value = '';
    document.getElementById("metodoPago").value = '';
    document.getElementById("estado").value = '';
    document.getElementById("tipoFactura").value = '';

    alert("Factura registrada con éxito!");
}   
};


const listarFacturas = async(e) => {
    e.preventDefault();
    const response= await fetch(`http://localhost:3001/facturas`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
    })
    const facturas= await response.json()
    document.getElementById("container").innerHTML = facturas.length === 0
    ? `<div><h1>No hay facturas registradas</h1></div>`
    : facturas.map(f =>
        `<div>
            <h2>Factura ID: ${f.id}</h2>
            <h3>Fecha de Emisión: ${f.fecha}</h3>
            
            <p>DNI cliente:</p> <a href="" onclick='consultarCliente(event,${f.clienteDNI})'>${f.clienteDNI}</a>
            <p>CUIT vendedor:</p> <a href="" onclick='consultarVendedor(event,${f.cuitVendedor})'>${f.cuitVendedor}</a>
            <p>Nro de chasis:</p> <a href="" onclick='consultarMoto(event, "${f.nro_chasis}")'>${f.nro_chasis}</a>
            <p>Detalle: ${f.detalle}</p>
            <p>Total: $${f.total}</p>

            <h4>Método de Pago: ${f.metodoPago}</h4>
            <p>Estado: ${f.estado}</p>
            <p>Tipo de Factura: ${f.tipoFactura}</p>
            
            <button style='background-color:red' onclick='eliminarFactura(${f.id})'>Eliminar</button>
        </div>`
    ).join('');
}



// Función para consultar una factura por ID
const consultarFactura = async(id) => {
    const response= await fetch(`http://localhost:3001/facturas/${id}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
    })
    const factura=await response.json()
    document.getElementById("container").innerHTML = factura == null
    ? `<div><h2>No hay factura registrada con ese ID</h2></div>`
    : `<div>
            <h2>Factura ID: ${factura.id}</h2>
            <h3>Fecha de Emisión: ${factura.fecha}</h3>

            <h4>Datos del Cliente:</h4>
            <p>DNI cliente: ${factura.clienteDNI}</p>

            <h4>Detalle:</h4>
            <p>Nro de chasis: ${factura.nro_chasis}</p>
            <p>Detalle: ${factura.detalle}</p>

            <p>Total:$${factura.total}</p>
            <p>Método de Pago: ${factura.metodoPago}</p>
            <p>Estado: ${factura.estado}</p>
            <p>Tipo de Factura: ${factura.tipoFactura}</p>
        </div>`;
}

// Función para eliminar una factura por ID
const eliminarFactura = async(id) => {
    await fetch(`http://localhost:3001/facturas/${id}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' }
    })
    listarFacturas(new Event('click'))
}
