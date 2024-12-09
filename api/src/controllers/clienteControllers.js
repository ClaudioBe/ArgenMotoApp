const {Cliente} = require("../db");

// Obtiene todos los clientes de la BDD
const getClientes = async() => {
    const clientes = await Cliente.findAll();  
    if(clientes.length!=0)return clientes;
    throw new Error("No hay clientes registrados");
}
// registra un cliente en la base de datos, con los atributos pasados por parametro
const postCliente=async({nombre, apellido, DNI, provincia, localidad, domicilio})=>{
    const clienteConDNI = await Cliente.findByPk(DNI);
    if (clienteConDNI) throw Error("Ya hay un cliente registrado con ese DNI");
    await Cliente.create({nombre, apellido, DNI, provincia, localidad, domicilio});
    return("Cliente registrado!")
}

// modifica un el cliente con el id y los atributos pasados por parametro  
const putCliente= async(DNI, cliente)=>{
  
    if(cliente.DNI){
        if(cliente.DNI!=DNI){
            const cli=await Cliente.findByPk(cliente.DNI);
            if(cli) throw Error("Ya hay un cliente registrado con ese DNI")
        }
    } 
    const clienteToUpdate=await Cliente.findByPk(DNI);
    
    if(clienteToUpdate.length) throw Error("No existe un cliente con ese DNI");
    await Cliente.update(cliente, {where: {DNI}})
    return "Cliente modificado!";
}

// obtiene de la base de datos el cliente con el id pasado por parametro
const getClienteByDNI=async(DNI)=>{
    const cliente=await Cliente.findByPk(DNI);
    if(!cliente)throw Error("No existe un cliente con ese DNI");
    return cliente;
}

//elimina de la base de datos el cliente con el id pasado por parametro 
const deleteCliente=async(DNI)=>{
    const clienteToDelete=await Cliente.findByPk(DNI);
    if(!clienteToDelete)throw Error("No existe un cliente con ese DNI");
    await Cliente.destroy({where:{DNI}})
    return ("Cliente eliminado!")
}

module.exports={getClientes, postCliente, putCliente, getClienteByDNI, deleteCliente};

