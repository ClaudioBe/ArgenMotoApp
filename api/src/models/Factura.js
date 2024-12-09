const { DataTypes} = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define('factura', {
        fecha:{
            type: DataTypes.STRING,
        },
        clienteDNI:{
            type:DataTypes.STRING,
        },
        id:{
            type:DataTypes.INTEGER,
            primaryKey:true,
            allowNull:false
        },
        cuitVendedor:{
            type:DataTypes.INTEGER,
        },
        idMoto:{
            type:DataTypes.INTEGER,
        },
        detalle: {
            type: DataTypes.STRING,
        },
        total: {
            type: DataTypes.INTEGER,
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