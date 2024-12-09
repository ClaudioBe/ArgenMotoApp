const { Vendedor } = require("../db");

// Obtiene todos los vendedores de la BDD
const getVendedores = async () => {
    const vendedores = await Vendedor.findAll();  
    if (vendedores.length !== 0) return vendedores;
    throw new Error("No hay vendedores registrados");
};

// Registra un vendedor en la base de datos, con los atributos pasados por parámetro
const postVendedor = async ({ nombre, apellido, CUIT, provincia, localidad, domicilio, email }) => {
    const vendedorConCUIT = await Vendedor.findByPk(CUIT);
    if (vendedorConCUIT) throw Error("Ya hay un vendedor registrado con ese CUIT");
    await Vendedor.create({ nombre, apellido, CUIT, provincia, localidad, domicilio, email });
    return "Vendedor registrado!";
};

// Modifica el vendedor con el CUIT y los atributos pasados por parámetro  
const putVendedor = async (CUIT, vendedor) => {
    if (vendedor.CUIT) {
        if (vendedor.CUIT !== CUIT) {
            const vend = await Vendedor.findByPk(vendedor.CUIT);
            if (vend) throw Error("Ya hay un vendedor registrado con ese CUIT");
        }
    }
    const vendedorToUpdate = await Vendedor.findByPk(CUIT);
    if (!vendedorToUpdate) throw Error("No existe un vendedor con ese CUIT");
    await Vendedor.update(vendedor, { where: { CUIT } });
    return "Vendedor modificado!";
};

// Obtiene de la base de datos el vendedor con el CUIT pasado por parámetro
const getVendedorByCUIT = async (CUIT) => {
    const vendedor = await Vendedor.findByPk(CUIT);
    if (!vendedor) throw Error("No existe un vendedor con ese CUIT");
    return vendedor;
};

// Elimina de la base de datos el vendedor con el CUIT pasado por parámetro 
const deleteVendedor = async (CUIT) => {
    const vendedorToDelete = await Vendedor.findByPk(CUIT);
    if (!vendedorToDelete) throw Error("No existe un vendedor con ese CUIT");
    await Vendedor.destroy({ where: { CUIT } });
    return "Vendedor eliminado!";
};

module.exports = { getVendedores, postVendedor, putVendedor, getVendedorByCUIT, deleteVendedor };
