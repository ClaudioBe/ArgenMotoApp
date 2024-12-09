const { Router } = require("express");
const facturaRouter = Router();
const { getFacturas, getFacturaById, postFactura, putFactura, deleteFactura } = require("../controllers/facturaControllers");

// Obtener todas las facturas
facturaRouter.get("/", async (req, res) => {
    try {
        const facturas = await getFacturas();
        res.status(200).json(facturas);
    } catch (error) {
        res.status(404).send(error.message);
    }
});

// Obtener una factura por ID
facturaRouter.get("/:id", async (req, res) => {
    try {
        const factura = await getFacturaById(req.params.id);
        res.status(200).json(factura);
    } catch (error) {
        res.status(404).send(error.message);
    }
});

// Registrar una nueva factura
facturaRouter.post("/", async (req, res) => {
    try {
        const factura = await postFactura(req.body);
        res.status(201).json(factura);
    } catch (error) {
        res.status(400).send(error.message);
    }
});

// Modificar una factura por ID
facturaRouter.put("/:id", async (req, res) => {
    try {
        const updatedFactura = await putFactura(req.params.id, req.body);
        res.status(200).json(updatedFactura);
    } catch (error) {
        res.status(400).send(error.message);
    }
});

// Eliminar una factura por ID
facturaRouter.delete("/:id", async (req, res) => {
    try {
        const factura = await deleteFactura(req.params.id);
        res.status(200).json(factura);
    } catch (error) {
        res.status(400).send(error.message);
    }
});

module.exports = facturaRouter;
