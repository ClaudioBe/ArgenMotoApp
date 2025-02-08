const crypto = require('crypto');
const {Administrador}=require('../db');

require('dotenv').config();

const hashPassword = (password) => { 
    const salt = process.env.SALT; 
    return crypto.createHmac('sha256', salt) .update(password) .digest('hex'); 
}; 

const verificarContraseña = (contraseñaIngresada, hashAlmacenado) => { 
    const hashIngresado = hashPassword(contraseñaIngresada); 
    return hashIngresado === hashAlmacenado;
};

const login=async(password)=>{
    const administrador = await Administrador.findOne(); 
    const verificacion = verificarContraseña(password, administrador.contraseña); 
    if(verificacion) return "Contraseña correcta!";
    throw Error ("Contraseña incorrecta!");
}

//solo se usa una vez para guar en la bbdd el admin con la contraseña
 const registrarAdmin=async (password)=>{
     const hash = hashPassword(password);
    const admin = await Administrador.create({contraseña:hash})
     return admin;
}

module.exports={registrarAdmin,login};