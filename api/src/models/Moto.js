const { DataTypes} = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define('moto', {
        descripcion:{
            type: DataTypes.STRING,
        },
        marca:{
            type:DataTypes.STRING,
        },
        nro_chasis:{
            type:DataTypes.STRING,
            primaryKey:true,
            allowNull:false
        },
        modelo:{
            type:DataTypes.STRING,
        },
        anio:{
            type:DataTypes.STRING,
        },
        kilometraje: {
            type: DataTypes.STRING,
        },
        stock_actual: {
            type: DataTypes.STRING,
        },
        stock_minimo: {
            type: DataTypes.STRING,
        },
        stock_maximo: {
            type: DataTypes.STRING,
        },
        precio: {
            type: DataTypes.STRING,
        },
    },{timestamps:false})
}