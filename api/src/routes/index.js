const { Router } = require('express');
const clienteRouter = require('./clienteRouter')
const adminRouter=require('./adminRouter')

const router = Router();

// Configurar los routers

router.use('/clientes', clienteRouter);
router.use('/admin', adminRouter);

module.exports = router;