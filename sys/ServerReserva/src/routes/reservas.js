import { Router } from "express";
import { CreateReservaController } from "../controller/reservas/CreateReservaController.js";
import { DeleteReservaController } from "../controller/reservas/DeleteReservaController.js";
import { GetAllReservaController } from "../controller/reservas/GetAllReservaController.js";
import { GetByIdReservaController } from "../controller/reservas/GetByIdReservaController.js";
import { UpdateReservaController } from "../controller/reservas/UpdateReservaController.js";


const reservaRouter = Router();

const getAllReservaController = new GetAllReservaController();
const getByIdReservaController = new GetByIdReservaController();
const updateReservaController = new UpdateReservaController();
const createReservaController = new CreateReservaController();
const deleteReservaController = new DeleteReservaController();

reservaRouter.get('/reserva', getAllReservaController.handle);
reservaRouter.get('/reserva/:id', getByIdReservaController.handle);
//post
reservaRouter.post('/reserva',createReservaController.handle);
//put
reservaRouter.put('/reserva',updateReservaController.handle);
//delete
reservaRouter.delete('/reserva',deleteReservaController.handle);




export {reservaRouter}