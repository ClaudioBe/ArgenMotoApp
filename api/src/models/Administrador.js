const { DataTypes} = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define('administrador', {
        contraseña:{
            type: DataTypes.STRING,
        },
       
    },{timestamps:false})
}