const { Router } = require('express');
const motoRouter = Router();
const { getMotos, postMoto, putMoto, getMotoByChasis, deleteMoto } = require('../controllers/motoControllers');

// Obtener todas las motos
motoRouter.get('/', async (req, res) => {
    try {
        const motos = await getMotos();
        res.status(200).json(motos); 
    } catch (error) {
        res.status(404).send(error.message);
    }
});

// Obtener una moto por número de chasis
motoRouter.get('/:nro_chasis', async (req, res) => {
    try {
        const moto = await getMotoByChasis(req.params.nro_chasis);
        res.status(200).json(moto);
    } catch (error) {
        res.status(404).send(error.message);
    }
});

// Registrar una nueva moto
motoRouter.post('/', async (req, res) => {
    try {
        const moto = await postMoto(req.body);
        res.status(201).json(moto);
    } catch (error) {
        res.status(400).send(error.message);
    }
});

// Modificar una moto por número de chasis
motoRouter.put('/:nro_chasis', async (req, res) => {
    try {
        const updatedMoto = await putMoto(req.params.nro_chasis, req.body);
        res.status(200).json(updatedMoto);
    } catch (error) {
        res.status(400).send(error.message);
    }
});

// Eliminar una moto por número de chasis
motoRouter.delete('/:nro_chasis', async (req, res) => {
    try {
        const moto = await deleteMoto(req.params.nro_chasis);
        res.status(200).json(moto);
    } catch (error) {
        res.status(400).send(error.message);
    }
});

module.exports = motoRouter;
