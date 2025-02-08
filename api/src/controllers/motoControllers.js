const { Moto } = require("../db");

// Obtiene todas las motos de la BDD
const getMotos = async () => {
    return await Moto.findAll();    
};

// Registra una moto en la base de datos, con los atributos pasados por parámetro
const postMoto = async ({ descripcion, marca, nro_chasis, modelo, anio, kilometraje, stock_actual, stock_minimo, stock_maximo, precio }) => {
    const motoConChasis = await Moto.findByPk(nro_chasis);
    if (motoConChasis) throw Error("Ya hay una moto registrada con ese número de chasis");
    await Moto.create({ descripcion, marca, nro_chasis, modelo, anio, kilometraje, stock_actual, stock_minimo, stock_maximo, precio });
    return "Moto registrada!";
};

// Modifica la moto con el número de chasis y los atributos pasados por parámetro  
const putMoto = async (nro_chasis, moto) => {
    const motoToUpdate = await Moto.findByPk(nro_chasis);
    if (!motoToUpdate) throw Error("No existe una moto con ese número de chasis");
    await Moto.update(moto, { where: { nro_chasis } });
    return "Moto modificada!";
};

// Obtiene de la base de datos la moto con el número de chasis pasado por parámetro
const getMotoByChasis = async (nro_chasis) => {
    const moto = await Moto.findByPk(nro_chasis);
    if (!moto) throw Error("No existe una moto con ese número de chasis");
    return moto;
};

// Elimina de la base de datos la moto con el número de chasis pasado por parámetro 
const deleteMoto = async (nro_chasis) => {
    const motoToDelete = await Moto.findByPk(nro_chasis);
    if (!motoToDelete) throw Error("No existe una moto con ese número de chasis");
    await Moto.destroy({ where: { nro_chasis } });
    return "Moto eliminada!";
};

module.exports = { getMotos, postMoto, putMoto, getMotoByChasis, deleteMoto };
