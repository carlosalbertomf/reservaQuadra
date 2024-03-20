import { Router } from "express";
import { CreateUsuarioController } from "../controller/usuarios/CreateUsuarioController.js";
import { DeleteUsuarioController } from "../controller/usuarios/DeleteUsuarioController.js";
import { GetAllUsuarioController } from "../controller/usuarios/GetAllUsuarioController.js";
import { GetByIdUsuarioController } from "../controller/usuarios/GetByIdUsuarioController.js";
import { UpdateUsuarioController } from "../controller/usuarios/UpdateUsuarioController.js";
import { GetByEmailUsuarioController } from "../controller/usuarios/GetByEmailUsuarioController.js";


const usuarioRouter = Router();


const getAllUsuarioController = new GetAllUsuarioController();
const getByIdUsuarioController = new GetByIdUsuarioController();
const getByEmailUsuarioController = new GetByEmailUsuarioController();
const deleteUsuarioController = new DeleteUsuarioController();
const createUsuarioController = new CreateUsuarioController();
const updateUsuarioController = new UpdateUsuarioController();

usuarioRouter.get('/usuario', getAllUsuarioController.handle);
usuarioRouter.get('/usuario/:id', getByIdUsuarioController.handle);
usuarioRouter.get('/usuario/email/:email', getByEmailUsuarioController.handle);
//post
usuarioRouter.post('/usuario',createUsuarioController.handle);
//put
usuarioRouter.put('/usuario',updateUsuarioController.handle);
//delete
usuarioRouter.delete('/usuario',deleteUsuarioController.handle);



export {usuarioRouter};
