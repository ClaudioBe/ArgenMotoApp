const { DataTypes} = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define('cliente', {
        nombre:{
            type: DataTypes.STRING,
        },
        apellido:{
            type:DataTypes.STRING,
        },
        DNI:{
            type:DataTypes.INTEGER,
            primaryKey:true,
            allowNull:false
        },
        provincia:{
            type:DataTypes.STRING,
        },
        localidad:{
            type:DataTypes.STRING,
        },
        domicilio: {
            type: DataTypes.STRING,
        },
    },{timestamps:false})
}