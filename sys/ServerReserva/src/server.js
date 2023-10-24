import express from 'express';
import { localRouter } from '../src/routes/locais.js'
import { mainRouter } from './routes/main.js';
import { reservaRouter } from './routes/reservas.js';
import { usuarioRouter } from './routes/usuarios.js';
import cors from 'cors';

const PORT = 3223;

const app = express();

app.use(cors());
app.use(express.json()); 
app.use(mainRouter);
app.use(localRouter);
app.use(reservaRouter);
app.use(usuarioRouter);

app.listen(PORT, () => 
{
    console.log(`Executando na porta: ${PORT}`); 
});