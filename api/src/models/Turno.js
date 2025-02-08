const { DataTypes} = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define('turno', {
        DNI:{
            type: DataTypes.STRING,
        },
        fecha:{
            type:DataTypes.STRING,
        },
        horario:{
            type:DataTypes.STRING,
        },
        motivo:{
            type:DataTypes.STRING,
        },
        estado:{
            type:DataTypes.STRING,
        }
    },{timestamps:false})
}