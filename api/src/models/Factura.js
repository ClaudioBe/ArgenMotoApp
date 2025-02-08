const { DataTypes} = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define('factura', {
        fecha:{
            type: DataTypes.STRING,
        },
        clienteDNI:{
            type:DataTypes.STRING,
        },
        cuitVendedor:{
            type:DataTypes.STRING,
        },
        nro_chasis:{
            type:DataTypes.STRING,
        },
        detalle: {
            type: DataTypes.STRING,
        },
        total: {
            type: DataTypes.STRING,
        },
        metodoPago: {
            type: DataTypes.STRING,
        },
        estado: {
            type: DataTypes.STRING,
        },
        tipoFactura: {
            type: DataTypes.STRING,
        },
    },{timestamps:false})
}