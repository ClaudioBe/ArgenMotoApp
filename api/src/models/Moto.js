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
            type:DataTypes.INTEGER,
            primaryKey:true,
            allowNull:false
        },
        modelo:{
            type:DataTypes.STRING,
        },
        anio:{
            type:DataTypes.INTEGER,
        },
        kilometraje: {
            type: DataTypes.INTEGER,
        },
        stock_actual: {
            type: DataTypes.INTEGER,
        },
        stock_minimo: {
            type: DataTypes.INTEGER,
        },
        stock_maximo: {
            type: DataTypes.INTEGER,
        },
        precio: {
            type: DataTypes.INTEGER,
        },
    },{timestamps:false})
}