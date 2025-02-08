const{Router}= require('express');
const turnoRouter=Router();
const {getTurnos, postTurno, putTurno, getTurnoById, deleteTurno} =require('../controllers/turnoControllers');

turnoRouter.get('/',async(req,res)=>{
    try {
        const turnos= await getTurnos();
        res.status(200).json(turnos); 
    } catch (error) {
        res.status(404).send(error.message);
    }
})

turnoRouter.get('/:id', async(req,res)=>{
    try {
        const turno=await getTurnoById(req.params.id);
        res.status(200).json(turno);
    } catch (error) {
        res.status(404).send(error.message);
    }
})

turnoRouter.post('/',async(req,res)=>{
    try {
        const turno = await postTurno(req.body)
        res.status(201).json(turno)
    } catch (error) {
        res.status(400).send(error.message);
    }
})

turnoRouter.put('/:id',async(req,res)=>{
    try {
        const newTurno = await putTurno(req.params.id, req.body);
        res.status(201).json(newTurno);
    } catch (error) {
        res.status(400).send(error.message);
    }
})


turnoRouter.delete('/:id',async(req,res)=>{
    try {
        const turno = await deleteTurno(req.params.id);
        res.status(201).json(turno);
    } catch (error) {
        res.status(400).send(error.message);
    }
})

module.exports=turnoRouter;
