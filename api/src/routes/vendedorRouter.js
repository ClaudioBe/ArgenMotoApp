const { Router } = require('express');
const vendedorRouter = Router();
const { getVendedores, postVendedor, putVendedor, getVendedorByCUIT, deleteVendedor } = require('../controllers/vendedorControllers');

// Obtener todos los vendedores
vendedorRouter.get('/', async (req, res) => {
    try {
        const vendedores = await getVendedores();
        res.status(200).json(vendedores);
    } catch (error) {
        res.status(404).send(error.message);
    }
});

// Obtener un vendedor por CUIT
vendedorRouter.get('/:CUIT', async (req, res) => {
    try {
        const vendedor = await getVendedorByCUIT(req.params.CUIT);
        res.status(200).json(vendedor);
    } catch (error) {
        res.status(404).send(error.message);
    }
});

// Registrar un nuevo vendedor
vendedorRouter.post('/', async (req, res) => {
    try {
        const vendedor = await postVendedor(req.body);
        res.status(201).json(vendedor);
    } catch (error) {
        res.status(400).send(error.message);
    }
});

// Modificar un vendedor por CUIT
vendedorRouter.put('/:CUIT', async (req, res) => {
    try {
        const updatedVendedor = await putVendedor(req.params.CUIT, req.body);
        res.status(200).json(updatedVendedor);
    } catch (error) {
        res.status(400).send(error.message);
    }
});

// Eliminar un vendedor por CUIT
vendedorRouter.delete('/:CUIT', async (req, res) => {
    try {
        const vendedor = await deleteVendedor(req.params.CUIT);
        res.status(200).json(vendedor);
    } catch (error) {
        res.status(400).send(error.message);
    }
});

module.exports = vendedorRouter;
