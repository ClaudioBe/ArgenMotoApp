const {Turno} = require("../db");

// Obtiene todos los clientes de la BDD
const getTurnos = async() => {
    return await Turno.findAll();  
}
// registra un cliente en la base de datos, con los atributos pasados por parametro
const postTurno=async(turno)=>{
    await Turno.create(turno);
    return("Turno registrado!")
}

// modifica un el cliente con el id y los atributos pasados por parametro  
const putTurno= async(id, turno)=>{
    const turnoToUpdate=await Turno.findByPk(id);
    
    if(turnoToUpdate.length) throw Error("No existe un turno con ese id");
    await Turno.update(turno, {where: {id}})
    return "Turno modificado!";
}

// obtiene de la base de datos el cliente con el id pasado por parametro
const getTurnoById=async(id)=>{
    const turno=await Turno.findByPk(id);
    if(!turno)throw Error("No existe un cliente con ese DNI");
    return turno
}

//elimina de la base de datos el cliente con el id pasado por parametro 
const deleteTurno=async(id)=>{
    const turnoToDelete=await Turno.findByPk(id);
    if(!turnoToDelete)throw Error("No existe un turno con ese id");
    await Turno.destroy({where:{id}})
    return ("Turno eliminado!")
}

module.exports={getTurnos, postTurno, putTurno, getTurnoById, deleteTurno};

