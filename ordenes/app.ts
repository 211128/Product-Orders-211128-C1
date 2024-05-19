import express from 'express';
import { Signale } from 'signale';
import { orderRouter } from './src/orders/infrastructure/ordersRoutes';
import { createDatabaseIfNotExists } from './src/database/conecction';
const app = express();
const signale = new Signale();

app.use(express.json());

createDatabaseIfNotExists();

app.use('/', orderRouter);

app.listen(3008, () => {
    signale.success("Server online in port 3008");
});
    