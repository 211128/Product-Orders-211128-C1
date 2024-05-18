import express from 'express';
import { Signale } from 'signale';
import { productRouter } from './src/usuarios/infrastructure/productRoutes';
import { createDatabaseIfNotExists } from './src/database/conecction';
const app = express();
const signale = new Signale();

app.use(express.json());

// Llamamos a la función para crear la base de datos si no existe
createDatabaseIfNotExists();

// Rutas relacionadas con usuarios
app.use('/', productRouter);

app.listen(3006, () => {
    signale.success("Server online in port 3006");
});
    