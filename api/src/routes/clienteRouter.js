const{Router}= require('express');
const clienteRouter=Router();
const {getClientes, postCliente, putCliente, getClienteByDNI, deleteCliente} =require('../controllers/clienteControllers');

clienteRouter.get('/',async(req,res)=>{
    try {
        const clientes= await getClientes();
        res.status(200).json(clientes); 
    } catch (error) {
        res.status(404).send(error.message);
    }
})

clienteRouter.get('/:DNI', async(req,res)=>{
    try {
        const cliente=await getClienteByDNI(req.params.DNI);
        res.status(200).json(cliente);
    } catch (error) {
        res.status(404).send(error.message);
    }
})

clienteRouter.post('/',async(req,res)=>{
    try {
        const cliente = await postCliente(req.body)
        res.status(201).json(cliente)
    } catch (error) {
        res.status(400).send(error.message);
    }
})

clienteRouter.put('/:DNI',async(req,res)=>{
    try {
        const newCliente = await putCliente(req.params.DNI, req.body);
        res.status(201).json(newCliente);
    } catch (error) {
        res.status(400).send(error.message);
    }
})


clienteRouter.delete('/:DNI',async(req,res)=>{
    try {
        const cliente = await deleteCliente(req.params.DNI);
        res.status(201).json(cliente);
    } catch (error) {
        res.status(400).send(error.message);
    }
})

module.exports=clienteRouter;
