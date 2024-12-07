const { Router } = require('express');
const clienteRouter = require('./clienteRouter')
const router = Router();

// Configurar los routers

router.use('/clientes', clienteRouter);

module.exports = router;