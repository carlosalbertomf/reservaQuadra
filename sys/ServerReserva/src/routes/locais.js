import { Router } from "express";
import { CreateLocalController } from "../controller/locais/CreateLocalController.js";
import { DeleteLocalController } from "../controller/locais/DeleteLocalController.js";
import { GetAllLocalController } from "../controller/locais/GetAllLocalController.js";
import { GetByIdLocalController } from "../controller/locais/GetByIdLocaisController.js";
import { UpdateLocalController } from "../controller/locais/UpdateLocalController.js";


const localRouter = Router();

const getAllLocalController = new GetAllLocalController();
const getByIdLocalController = new GetByIdLocalController();
const updateLocalController = new UpdateLocalController();
const createLocalController = new CreateLocalController();
const deleteLocalController = new DeleteLocalController();

localRouter.get('/local', getAllLocalController.handle);
localRouter.get('/local/:id', getByIdLocalController.handle);
//post
localRouter.post('/local',createLocalController.handle);
//put
localRouter.put('/local',updateLocalController.handle);
//delete
localRouter.delete('/local',deleteLocalController.handle);




export {localRouter}