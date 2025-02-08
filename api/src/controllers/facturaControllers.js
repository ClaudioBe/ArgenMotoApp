const { Factura } = require("../db");

// Obtener todas las facturas
const getFacturas = async () => {
    return await Factura.findAll();
};

// Obtener una factura por ID
const getFacturaById = async (id) => {
    const factura = await Factura.findByPk(id);
    if (!factura) throw new Error("No existe una factura con ese ID");
    return factura;
};

// Registrar una nueva factura
const postFactura = async ({ fecha, clienteDNI, id, cuitVendedor, nro_chasis, detalle, total, metodoPago, estado, tipoFactura }) => {
    const facturaExistente = await Factura.findByPk(id);
    if (facturaExistente) throw new Error("Ya existe una factura con ese ID");
    await Factura.create({ fecha, clienteDNI, id, cuitVendedor, nro_chasis, detalle, total, metodoPago, estado, tipoFactura });
    return "Factura registrada!";
};

// Modificar una factura existente
const putFactura = async (id, factura) => {
    const facturaToUpdate = await Factura.findByPk(id);
    if (!facturaToUpdate) throw new Error("No existe una factura con ese ID");
    await Factura.update(factura, { where: { id } });
    return "Factura modificada!";
};

// Eliminar una factura por ID
const deleteFactura = async (id) => {
    const facturaToDelete = await Factura.findByPk(id);
    if (!facturaToDelete) throw new Error("No existe una factura con ese ID");
    await Factura.destroy({ where: { id } });
    return "Factura eliminada!";
};

module.exports = { getFacturas, getFacturaById, postFactura, putFactura, deleteFactura };