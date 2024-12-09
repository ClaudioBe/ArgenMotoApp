const { Router } = require('express');
const clienteRouter = require('./clienteRouter')
const motoRouter = require('./motoRouter')
const vendedorRouter = require('./vendedorRouter')
const facturaRouter = require('./facturaRouter');
const router = Router();

// Configurar los routers

router.use('/clientes', clienteRouter);
router.use('/motos', motoRouter);
router.use('/vendedores', vendedorRouter);
router.use('/facturas', facturaRouter);

module.exports = router;