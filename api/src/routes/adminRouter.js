const {Router} = require('express'); 
const adminRouter = Router(); 

const {/*registrarAdmin,*/ login} = require('../controllers/adminControllers')

adminRouter.post('/login', async (req, res) => { 
    try {
        const logIn = await login(req.body.contraseña);
        res.status(201).json(logIn);
    } catch (error) {
        res.status(400).send(error.message)   
    }
}); 
//solo se usa una vez para guar en la bbdd el admin con la contraseña
// adminRouter.post('/registrar', async (req, res) => { 
//     try { 
//         const admin = await registrarAdmin(req.body.contraseña);
//         res.status(201).json(admin);
//     } catch (error) { 
//         res.status(400).send(error.message)
//     } 
// });
    
module.exports=adminRouter;