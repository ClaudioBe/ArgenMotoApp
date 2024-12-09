const { DataTypes} = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define('vendedor', {
        nombre:{
            type: DataTypes.STRING,
        },
        apellido:{
            type:DataTypes.STRING,
        },
        CUIT:{
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
        email: {
            type: DataTypes.STRING,
        },
    },{timestamps:false})
}